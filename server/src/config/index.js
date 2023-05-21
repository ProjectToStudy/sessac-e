const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

module.exports = {
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    secret: process.env.SECRET,
    sms: {
        accessKey: process.env.SMS_ACCESS_KEY,
        secretKey: process.env.SMS_SECRET_KEY,
        serviceId: process.env.SMS_SERVICE_ID,
    }
};
