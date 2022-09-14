const express = require('express');

const auth = require('./routes/auth');

const router = () => {
    const app = express.Router();

    auth.authRouter({ app });

    return app;
};

let baseURL = (process.env.BASE_URL === undefined ? '' : process.env.BASE_URL);
baseURL = baseURL.replace(/\/+$/, '').trim();

module.exports = {
    router,
    baseURL,
};
