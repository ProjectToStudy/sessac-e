const teamService = require('../services/team');

const getTeams = async (req, res, next) => {
    try {
        const result = await teamService.findAllTeams(req.query);

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
        const result = await teamService.findAllCategories(req.query);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
}

const postStats = async (req, res, next) => {
    try {
        const result = await teamService.postStats({...req.user, ...req.body});

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
    postStats,
}
