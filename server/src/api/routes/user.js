const express = require('express');

const route = express.Router();

const user = require('../../controllers/user');

const userRouter = ({ app }) => {
    app.use('/api/v1/user', route);

    // TODO: 코드 구조 리팩토링

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

        if (result !== 'SUCCESS') {
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

        if (result !== 'SUCCESS') {
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
     *     description: 인증번호 검증
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
     *                 type: integer
     *     responses:
     *       200:
     *         description: 인증번호 검증 성공
     *       400:
     *         description: 인증번호 검증 실패
     */
    route.post('/cert/check', async (req, res, next) => {
        const result = await user.checkCertNumber(req.body);

        if (result !== 'SUCCESS') {
            return next(result);
        }

        return res.status(200).json(result);
    });
};

module.exports = {
    userRouter,
};
