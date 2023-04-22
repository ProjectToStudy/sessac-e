const Sequelize = require('sequelize');

const db = require('../../models');
const service = require('../index');
const arrayUtils = require('../../utils/array');
const {teamRouter} = require("../../api/routes/team");
const datetime = require("../../utils/datetime");

const findAllTeams = async (data) => {
    try {
        const {selectFields, whereFields, orderByFields} = service.makeOptions(data);

        const result = await db.teamInfo.findAll({
            attributes: selectFields,
            where: whereFields,
            order: orderByFields,
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
                    acc.push(item.imageUrl);
                    return acc;
                }, []);

            team.hitsCount = teamStatsResult
                .filter((item) => item.teamInfoId === team.id)
                .reduce((acc, item) => {
                    acc += item.hitsCount;
                    return acc;
                }, 0);

            team.isNew = datetime.compareToCurrentTime(datetime.addDatetime('d', 7, team.createdAt));
        });

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
