const redis = require('redis');
const config = require('../config');

const redisPort = config.redis ? parseInt(config.redis) : 8001;

const redisClient = redis.createClient(redisPort);

(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;
