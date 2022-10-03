const express = require('express');

const route = express.Router();

const user = require('../../controllers/user');

const userRouter = ({ app }) => {
    app.use('/v1/user', route);

    // TODO: 코드 구조 리팩토링

    // 인증번호 보내는 API
    route.post('/cert/send', async (req, res, next) => {
        const result = await user.sendCertNumber(req.body);

        if (result !== 'SUCCESS') {
            return next(result);
        }

        return res.status(200).json(result);
    });

    // 인증번호 테스트 API -> 메세지 send 로직 제외 나머지 -> 테스트 목적
    route.post('/cert/test', async (req, res, next) => {
        const result = await user.testCertNumber(req.body);

        if (result !== 'SUCCESS') {
            return next(result);
        }
        return res.status(200).json(result);
    });

    // 인증번호 검증 API
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
