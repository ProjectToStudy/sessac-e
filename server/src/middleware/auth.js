const jwt = require('../utils/jwt');

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
        const result = jwt.verify(token);

        if (result.ok) {
            req.user = result.decoded;
            return next();
        } else if (result.message === 'jwt expired') {
            return res.status(403).json({
                message: '엑세스 토큰 민료',
            });
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
