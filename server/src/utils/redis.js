const redis = require('redis');
const config = require('../config');

const redisPort = config.redis.port ? parseInt(config.redis.port) : 6379;
const redisHost = config.redis.host ? config.redis.host : '127.0.0.1';

const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: redisHost,
        port: redisPort,
    }
});

redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().then();

module.exports = redisClient;
