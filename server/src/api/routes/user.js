const express = require('express');

const route = express.Router();

const userController = require('../../controllers/user');
const authMiddleware = require('../../middleware/auth');

const userRouter = ({ app }) => {
    app.use('/api/v1/user', route);

    route.get('', authMiddleware.verify, userController.getUserInfo);

    route.get('/teams', authMiddleware.verify, userController.getUserTeamsInfo);

    route.patch('/', authMiddleware.verify, userController.updateUserInfo);

    route.post('/login', userController.loginUser);

    route.post('/join', userController.joinUser);

    route.post('/cert/test', userController.testCertNumber);

    route.post('/cert/send', userController.sendCertNumber);

    route.post('/cert/check', userController.checkCertNumber);
};

module.exports = {
    userRouter,
};
