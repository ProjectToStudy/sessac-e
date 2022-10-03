const express = require('express');
const bodyParser = require('body-parser');

const loaders = require('./loaders');
const { sequelize } = require('./models');

const port = process.env.PORT || 8000;

const startServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    // sequelize.sync({ force: true })
    sequelize.sync()
        .then(() => {
            console.log('데이터베이스 연결됨');
        })
        .catch((err) => {
            console.log(err);
        });

    await loaders({ expressApp: app });

    process.on('SIGINT', () => {
        console.log('Exiting baedalgeek-scheduler-jobs');
        process.exit();
    });

    process.on('SIGTERM', () => {
        console.log('Exiting baedalgeek-scheduler-jobs');
        process.exit();
    });

    app.listen(port, () => {
        console.log('Listening Port: ' + port);
    }).on('error', err => {
        console.log(err);
        process.exit(1);
    });
};

startServer()
    .then()
    .catch(err => {
        console.log(err);
    });
