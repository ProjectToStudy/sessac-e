const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const loaders = require('./loaders');
const { sequelize } = require('./models');

const port = process.env.PORT || 8000;

const startServer = async () => {
    const app = express();

    app.use(cors({
        origin: ['http://dev.sessac-e.site', 'http://localhost:3000'],
        credential: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    // 유의 : 프로덕션 모드에서는 절대 사용하지 말 것
    // sequelize.sync({ force: true })
    // sequelize.sync({ alter: true })
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
