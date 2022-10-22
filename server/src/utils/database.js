const { database } = require('../config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(database.name, database.user, database.password, {
    dialect: 'mysql',
    host: database.host,
    timezone: '+09:00',
});

module.exports = sequelize;
