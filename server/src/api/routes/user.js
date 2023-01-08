const express = require('express');

const route = express.Router();

const user = require('../../controllers/user');
const auth = require('../../middleware/auth');

const userRouter = ({ app }) => {
    app.use('/api/v1/user', route);

    /**
     * @swagger
     * /api/v1/user:
     *   get:
     *     tags:
     *       - user
     *     description: 회원정보 get
     *     security:
     *       - authorization: []
     *     parameters:
     *       - name: authorization
     *         in: header
     *         value: Bearer [accessToken]
     *         description: 엑세스 토큰
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: 성공
     *         content:
     *           application/json:
     *             example:
     *               - code: 200000
     *                 message: success
     *                 result : '[회원 정보]'
     *       400:
     *         description: 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 400102
     *                 message: 회원정보 저장 및 호출에 실패했습니다
     *       401:
     *         description: 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 401102
     *                 message: 회원정보를 가져올 수 없습니다
     */
    route.get('/', auth.verify, async (req, res, next) => {
        const result = await user.getUserInfo(req.user);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    });

    /**
     * @swagger
     * /api/v1/user:
     *   patch:
     *     tags:
     *       - user
     *     description: 회원정보 update
     *     security:
     *       - authorization: []
     *     parameters:
     *       - name: authorization
     *         in: header
     *         value: Bearer [accessToken]
     *         description: 엑세스 토큰
     *         required: true
     *         type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               data:
     *                 type: object
     *                 properties:
     *                   career:
     *                     type: array
     *                     items:
     *                       type: string
     *                   purpose:
     *                     type: array
     *                     items:
     *                       type: string
     *                   etc:
     *                     type: string
     *     responses:
     *       200:
     *         description: 성공
     *         content:
     *           application/json:
     *             example:
     *               - code: 200000
     *                 message: success
     *       400:
     *         description: 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 400102
     *                 message: 회원정보 저장 및 호출에 실패했습니다
     */
    route.patch('/', auth.verify, async (req, res, next) => {
        const result = await user.updateUserInfo(req.user, req.body.data);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    });

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
     *         content:
     *           application/json:
     *             example:
     *               - code: 200000
     *                 message: success
     *       400:
     *         description: 인증번호 전송 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 400101
     *                 message: 인증번호 저장 및 호출에 실패했습니다
     *               - code: 400301
     *                 message: 인증번호 전송에 실패했습니다
     *                 result: '[인증번호 실패 오류]'
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
     *         content:
     *           application/json:
     *             example:
     *               - code: 200000
     *                 message: success
     *       400:
     *         description: 인증번호 전송 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 400101
     *                 message: 인증번호 저장 및 호출에 실패했습니다
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
     *         content:
     *           application/json:
     *             example:
     *               - code: 200000
     *                 message: success
     *       400:
     *         description: 인증번호 검증 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 400101
     *                 message: 인증번호 저장 및 호출에 실패했습니다
     *       401:
     *         description: 인증번호 검증 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 401001
     *                 message: 인증번호가 입력되지 않았습니다
     *               - code: 401101
     *                 message: 인증번호가 잘못되었습니다
     *               - code: 401201
     *                 message: 유효시간이 지난 인증번호입니다
     *               - code: 401301
     *                 message: 인증번호 입력 횟수를 초과했습니다
     */
    route.post('/cert/check', async (req, res, next) => {
        const result = await user.checkCertNumber(req.body);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
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
     *         description: 로그인 성공
     *         content:
     *           application/json:
     *             example:
     *               - code: 200000
     *                 message: success
     *                 result: {
     *                     accessToken: String,
     *                     refreshToken: String
     *                 }
     *       400:
     *         description: 로그인 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 400102
     *                 message: 회원정보 저장 및 호출에 실패했습니다
     *       401:
     *         description: 로그인 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 401002
     *                 message: 회원가입이 필요합니다
     */
    route.post('/login', async (req, res, next) => {
        const userResult = await user.getUser(req.body);

        if (userResult.message !== 'success') {
            return next(userResult);
        }

        const loginResult = await user.loginUser(userResult.result);

        if (loginResult.message !== 'success') {
            return next(loginResult);
        }

        // 쿠키 저장
        const accessToken = loginResult.result.accessToken;
        // res.setHeader('Set-Cookie', `accessToken=${accessToken}; path=/; secure=true; samesite=none`);
        res.setHeader('Set-Cookie', `accessToken=${accessToken}; path=/;`);

        return res.status(200).json(loginResult);
    });

    /**
     * @swagger
     * /api/v1/user/join:
     *   post:
     *     tags:
     *       - user
     *     description: 회원가입
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
     *         description: 회원가입 및 로그인 성공
     *         content:
     *           application/json:
     *             example:
     *               - code: 200000
     *                 message: success
     *                 result: {
     *                     accessToken: String,
     *                     refreshToken: String
     *                 }
     *       400:
     *         description: 회원가입 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 400102
     *                 message: 회원정보 저장 및 호출에 실패했습니다
     */
    route.post('/join', async (req, res, next) => {
        const userResult = await user.createUser(req.body);

        if (userResult.message !== 'success') {
            return next(userResult);
        }

        const loginResult = await user.loginUser(userResult.result);

        if (loginResult.message !== 'success') {
            return next(loginResult);
        }

        // 쿠키 저장
        const accessToken = loginResult.result.accessToken;
        // res.setHeader('Set-Cookie', `accessToken=${accessToken}; Path=/; secure=true; samesite=none`);
        res.setHeader('Set-Cookie', `accessToken=${accessToken}; Path=/;`);

        return res.status(200).json(loginResult);
    });

};

module.exports = {
    userRouter,
};
