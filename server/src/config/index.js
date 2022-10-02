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
};
