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

const postTeams = async (req, res, next) => {
    try {
        const result = await teamService.postTeams({userId: req.user.id, ...req.body});

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
        const result = await teamService.postStats({userId: req.user.id, ...req.body});

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
}

const patchStats = async (req, res, next) => {
    try {
        const result = await teamService.patchStats({userId: req.user.id, ...req.body, ...req.params});

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
    postTeams,
    postStats,
    patchStats,
}
