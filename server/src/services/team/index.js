const Sequelize = require('sequelize');

const db = require('../../models');
const service = require('../index');
const arrayUtils = require('../../utils/array');
const datetime = require("../../utils/datetime");

const whereParser = (data) => {
    const whereFields = [];

    if (data.category) {
        const category = [];
        data.category.forEach((item) => {
            category.push(Sequelize.literal(`JSON_CONTAINS(category, '${item}')`));
        });

        whereFields.push({
            [Sequelize.Op.or]: category,
        });
    }

    if (data.isValid) {
        whereFields.push({
            isValid: data.isValid[0] === 'true',
        });
    }

    return {
        [Sequelize.Op.and] : whereFields
    };
}

const findAllTeams = async (data) => {
    try {
        const {selectFields, whereFields, orderByFields, limitCount} = service.makeOptions(data);

        let result = await db.teamInfo.findAll({
            attributes: selectFields,
            where: whereParser(whereFields),
            // order: orderByFields,
            raw: true,
        });

        const uniqueTeamInfoId = arrayUtils.extractUniqueValuesByObjects(result, 'id');

        const teamPhotoResult = await db.teamPhotoInfo.findAll({
            attributes: ['teamInfoId', 'imageUrl'],
            where: {
                teamInfoId: {
                    [Sequelize.Op.in]: uniqueTeamInfoId,
                },
                deletedAt: null,
                sortNo: 0,
            },
            order: ['sortNo'],
            raw: true,
        });

        const teamStatsResult = await db.teamStatsInfo.findAll({
            attributes: [
                'teamInfoId',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'hitsCount'],
            ],
            where: {
                teamInfoId: {
                    [Sequelize.Op.in]: uniqueTeamInfoId,
                },
                type: 'hits',
                deletedAt: null,
            },
            group: 'teamInfoId',
            raw: true,
        });

        const teamUserResult = await db.teamUserInfo.findAll({
            attributes: [
                'teamInfoId',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'userCount'],
            ],
            where: {
                teamInfoId: {
                    [Sequelize.Op.in]: uniqueTeamInfoId,
                },
                status: 2,
            },
            group: 'teamInfoId',
            raw: true,
        });

        result.map((team) => {
            team.imageUrl = teamPhotoResult
                .filter((item) => item.teamInfoId === team.id)
                .reduce((acc, item) => {
                    acc = item.imageUrl;
                    return acc;
                }, '');

            team.hitsCount = teamStatsResult
                .filter((item) => item.teamInfoId === team.id)
                .reduce((acc, item) => {
                    acc += item.hitsCount;
                    return acc;
                }, 0);

            team.userCount = teamUserResult
                .filter((item) => item.teamInfoId === team.id)
                .reduce((acc, item) => {
                    acc += item.userCount;
                    return acc;
                }, 0);

            team.isNew = datetime.compareToCurrentTime(datetime.addDatetime('d', 7, team.createdAt));
        });

        if (orderByFields.length > 0) {
            result = service.sortArray(result, orderByFields);
        }

        if (limitCount) {
            result = result.slice(0, limitCount);
        }

        return service.sendToResult(result);
    } catch (err) {
        throw err;
    }
}

const postTeams = async (data) => {
    // 트랜잭션 시작
    const transaction = await db.sequelize.transaction();

    try {
        const {userId, userPhone, image, ...rest} = data;

        const teamResult = await db.teamInfo.create({
            createdUserId: userId,
            ...rest
        }, {transaction});

        const insertImageData = image.map((item) => {
            item.teamInfoId = teamResult.id;
            return item;
        });

        await db.teamPhotoInfo.bulkCreate(
            insertImageData,
            {transaction}
        );

        // 트랜잭션 커밋
        await transaction.commit();

        return service.sendToResult(teamResult.id);
    } catch (err) {
        // 트랜잭션 롤백
        console.log('롤백');
        await transaction.rollback();
        throw err;
    }
}

const findAllCategories = async (data) => {
    try {
        const {selectFields, whereFields, orderByFields} = service.makeOptions(data);

        const result = await db.categoryInfo.findAll({
            attributes: selectFields,
            where: whereFields,
            order: orderByFields,
            raw: true,
        });

        return service.sendToResult(result);
    } catch (err) {
        throw err;
    }
}

const postStats = async (data) => {
    try {
        const {userId, type, teamId} = data;

        if (!userId || !type || !teamId) {
            return {
                code: 400000, // TODO: 코드 정의 필요
            }
        }

        if (data.type === 'likes') {
            const statsResult = await db.teamStatsInfo.findAll({
                where: {
                    userId: {
                        [Sequelize.Op.eq]: userId,
                    },
                    type: {
                        [Sequelize.Op.eq]: type,
                    },
                    teamInfoId: {
                        [Sequelize.Op.eq]: teamId,
                    },
                    isValid: {
                        [Sequelize.Op.eq]: true,

                    },
                },
                raw: true,
            });

            if (statsResult.length > 0) {
                return {
                    code: 400555, // TODO: 코드 정의 필요
                }
            }
        }

        const createFields = {
            userId: data.id,
            type: data.type,
            teamInfoId: data.teamId,
            isValid: true,
        }

        await db.teamStatsInfo.create(createFields);

        return {
            code: 200000,
            message: 'success',
        }
    } catch (err) {
        throw err;
    }
}

const patchStats = async (data) => {
    try {
        const {userId, id} = data;

        if (!userId || !id) {
            return {
                code: 400000, // TODO: 코드 정의 필요
            }
        }

        const updateFields = service.validateData(data);
        const type = 'likes'    // update 되는 type 은 'likes' 만 가능

        if (!updateFields) {
            return {
                code: 400111,   // data validation error
            }
        }

        const result = await db.teamStatsInfo.update({
            isValid: false,
        }, {
            where: {
                userId: {
                    [Sequelize.Op.eq]: userId,
                },
                teamInfoId: {
                    [Sequelize.Op.eq]: id,
                },
                type: {
                    [Sequelize.Op.eq]: type,
                },
            }
        });

        if (result[0] === 0) {
            return {
                code: 400222,   // update failed error
            }
        }

        return {
            code: 200000,
            message: 'success',
        };
    } catch (err) {
        throw err;
    }
}

module.exports = {
    findAllCategories,
    findAllTeams,
    postTeams,
    postStats,
    patchStats,
}
