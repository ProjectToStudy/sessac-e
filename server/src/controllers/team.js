const team = require('../services/team');

const getTeams = async (req, res, next) => {
    try {
        const result = await team.findAllTeams(req.query);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
}

const getCategories = async (req, res, next) => {
    try {
        const result = await team.findAllCategories(req.query);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    getCategories,
    getTeams,
}
