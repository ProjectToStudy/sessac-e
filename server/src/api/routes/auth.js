const express = require('express');

const route = express.Router();

const auth = require('../../controllers/auth');

const authRouter = ({ app }) => {
    app.use('/auth', route);

    // sms 인증 문자 보내기
    route.get('/sendSms', auth.sendAuthSms);
};

module.exports = {
    authRouter,
};
