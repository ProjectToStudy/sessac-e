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

const decode = (token) => {
    return jwt.decode(token, {complete: true});
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
        expiresIn: '1h',
    });
}

async function refreshVerify(token, id) {
    const getAsync = promisify(redisClient.get).bind(redisClient);

    console.log('refreshVerify');
    try {
        const data = await getAsync(id);
        console.log(data);
        if (token === data) {
            try {
                jwt.verify(data, secret);
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
    decode,
    verify,
    refresh,
    refreshVerify,
};
