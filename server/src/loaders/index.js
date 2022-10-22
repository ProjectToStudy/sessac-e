const expressLoader = require('./express');

module.exports = async ({ expressApp }) => {
    console.log('indexLoader');

    await expressLoader({ app: expressApp });
};
