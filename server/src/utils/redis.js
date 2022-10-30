const redis = require('redis');
const config = require('../config');

const redisPort = config.redis ? parseInt(config.redis) : 6379;

const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: 'redis',
        port: redisPort,
    }
});

redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().then();

module.exports = redisClient;
