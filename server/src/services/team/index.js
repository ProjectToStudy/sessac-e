const db = require('../../models');
const service = require('../index');

const findAllTeams = async (data) => {
    try {
        const {selectFields, whereFields, orderByFields} = service.makeOptions(data);

        const result = await db.teamInfo.findAll({
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
