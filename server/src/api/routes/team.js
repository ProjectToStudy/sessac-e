const express = require('express');

const route = express.Router();

const teamController = require('../../controllers/team');
const authMiddleware = require('../../middleware/auth');

const teamRouter = ({ app }) => {
    app.use('/api/v1/teams', route);

    route.get('', teamController.getTeams);

    route.get('/categories', teamController.getCategories);

    route.post('/stats', authMiddleware.verify, teamController.postStats);
}

module.exports = {
    teamRouter,
};

