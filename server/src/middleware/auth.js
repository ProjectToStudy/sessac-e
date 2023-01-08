const jwt = require('../utils/jwt');
const redisClient = require('../utils/redis');
const {paramsHaveRequestBody} = require("request/lib/helpers");

async function verify(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!req.headers.authorization) {
        console.log('엑세스 토큰 없음');
        return res.status(403).json({
            message: '엑세스 토큰 없음',
        });
    }
    try {
        const token = authHeader.split(' ')[1];
        // 엑세스 토큰 검증임
        const result = jwt.verify(token);

        if (result.ok) {
            req.user = result.decoded;
            return next();
        } else if (result.message === 'jwt expired') {
            // 만료되면 refreshToken 검증 후 갱신하기
            const decoded = jwt.decode(token);
            const payload = decoded.payload;
            const verify = jwt.refreshVerify(token, payload.id);

            // 리프레시 토큰이 유효하지 않은 상태이면
            // 1. 재발급 하고 레디스에 저장한다
            // 2. 엑세스 토큰을 재발급하고 쿠키로 전달한다 -> next()
            if (!verify) {
                // const refreshToken = jwt.refresh();
                //
                // // refreshToken redis 저장
                // redisClient.set(payload.id, refreshToken);
                return res.status(403).json({
                    message: '리프레시 토큰 만료',
                });
            }

            const accessToken = jwt.sign({
                id: payload.id,
                phone: payload.phone,
            });
            res.setHeader('Set-Cookie', `accessToken=${accessToken}; Path=/`);
            req.user = payload;

            return next();
        } else {
            console.log('엑세스 토큰 없음');
            return res.status(403).json({
                message: '엑세스 토큰 없음',
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(403).json({
            message: '엑세스 토큰 검증 실패',
        });
    }
}

module.exports = {
    verify,
};
