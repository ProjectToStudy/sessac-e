const express = require('express');

const auth = require('./routes/user');

const router = () => {
    const app = express.Router();

    auth.userRouter({ app });

    return app;
};

let baseURL = (process.env.BASE_URL === undefined ? '' : process.env.BASE_URL);
baseURL = baseURL.replace(/\/+$/, '').trim();

module.exports = {
    router,
    baseURL,
};
