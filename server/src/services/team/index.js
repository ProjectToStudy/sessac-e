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

module.exports = {
    findAllCategories,
    findAllTeams,
}
