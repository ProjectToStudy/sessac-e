const express = require('express');

const {userRouter} = require('./routes/user');
const {teamRouter} = require('./routes/team');

const router = () => {
    const app = express.Router();

    userRouter({app});
    teamRouter({app});

    return app;
};

let baseURL = (process.env.BASE_URL === undefined ? '' : process.env.BASE_URL);
baseURL = baseURL.replace(/\/+$/, '').trim();

module.exports = {
    router,
    baseURL,
};
