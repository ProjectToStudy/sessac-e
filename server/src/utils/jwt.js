const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const config = require('../config');

const redisClient = require('./redis');
const secret = config.secret ? config.secret : '';

function sign(user) {
    const payload = {
        // access token 에 들어갈 payload
        id: user.id,
        phone: user.phone,
    };

    return jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: '1h',
    });
}

function verify(token) {
    let decoded = null;

    try {
        decoded = jwt.verify(token, secret);
        return {
            ok: true,
            decoded,
        };
    } catch (err) {
        console.log(err);
        return {
            ok: false,
            message: err.message,
        };
    }
}

function refresh() {
    return jwt.sign({}, secret, {
        algorithm: 'HS256',
        expiresIn: '14d',
    });
}

async function refreshVerify(token, phone) {
    const getAsync = promisify(redisClient.get).bind(redisClient);

    try {
        const data = await getAsync(phone);
        if (token === data) {
            try {
                jwt.verify(token, secret);
                return true;
            } catch (err) {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

module.exports = {
    sign,
    verify,
    refresh,
    refreshVerify,
};
