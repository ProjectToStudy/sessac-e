const express = require('express');

const route = express.Router();

const user = require('../../controllers/user');

const userRouter = ({ app }) => {
    app.use('/api/v1/user', route);

    /**
     * @swagger
     * /api/v1/user/cert/send:
     *   post:
     *     tags:
     *       - user
     *     description: 인증번호 전송
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               phone:
     *                 type: string
     *     responses:
     *       200:
     *         description: 인증번호 전송 성공
     *       400:
     *         description: 인증번호 전송 실패
     */
    route.post('/cert/send', async (req, res, next) => {
        const result = await user.sendCertNumber(req.body);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    });

    /**
     * @swagger
     * /api/v1/user/cert/test:
     *   post:
     *     tags:
     *       - user
     *     description: 실제 인증번호 전송되지 않는 테스트용 API (인증번호 123456)
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               phone:
     *                 type: string
     *     responses:
     *       200:
     *         description: 인증번호 전송 성공
     *       400:
     *         description: 인증번호 전송 실패
     */
    route.post('/cert/test', async (req, res, next) => {
        const result = await user.testCertNumber(req.body);

        if (result.message !== 'success') {
            return next(result);
        }
        return res.status(200).json(result);
    });

    /**
     * @swagger
     * /api/v1/user/cert/check:
     *   post:
     *     tags:
     *       - user
     *     description: 인증번호 검증 및 로그인
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               phone:
     *                 type: string
     *               certificationNumber:
     *                 type: string
     *     responses:
     *       200:
     *         description: 인증번호 검증 성공
     *       400:
     *         description: 인증번호 검증 실패
     */
    route.post('/cert/check', async (req, res, next) => {
        const result = await user.checkCertNumber(req.body);

        if (result.message !== 'success') {
            return next(result);
        }

        const userResult = await user.getUser(req.body);

        if (userResult.message !== 'success') {
            return next(userResult);
        }

        const loginResult = await user.loginUser(userResult.result);

        if (loginResult.message !== 'success') {
            return next(loginResult);
        }

        return res.status(200).json(loginResult);
    });

    /**
     * @swagger
     * /api/v1/user/login:
     *   post:
     *     tags:
     *       - user
     *     description: 로그인
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               phone:
     *                 type: string
     *     responses:
     *       200:
     *         description: 인증번호 전송 성공
     *       400:
     *         description: 인증번호 전송 실패
     */
    route.post('/login', async (req, res, next) => {
        const userResult = await user.createUser(req.body);

        if (userResult.message !== 'success') {
            return next(userResult);
        }

        const loginResult = await user.loginUser(userResult.result);

        if (loginResult.message !== 'success') {
            return next(loginResult);
        }

        return res.status(200).json(loginResult);
    });
};

module.exports = {
    userRouter,
};
