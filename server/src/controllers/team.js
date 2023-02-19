const team = require('../services/team');

const getCategories = async (req, res, next) => {
    try {
        const result = await team.findAllCategories(req.query);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        return next({
            code: 500000,
            result: err,
        })
    }
}

module.exports = {
    getCategories,
}
