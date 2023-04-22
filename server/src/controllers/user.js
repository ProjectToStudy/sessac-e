const userService = require('../services/user');

const getUserInfo = async (req, res, next) => {
    try {
        const result = await userService.getUserInfo(req.user);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
}

const getUserTeamsInfo = async (req, res, next) => {
    try {
        const result = await userService.getUserTeamsInfo(req.user);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
}

const updateUserInfo = async (req, res, next) => {
    try {
        const result = await userService.updateUserInfo(req.user, req.body.data);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const userResult = await userService.getUser(req.body);

        if (userResult.message !== 'success') {
            return next(userResult);
        }

        const loginResult = await userService.loginUser(userResult.result);

        if (loginResult.message !== 'success') {
            return next(loginResult);
        }

        // 쿠키 저장
        const accessToken = loginResult.result.accessToken;
        // res.setHeader('Set-Cookie', `accessToken=${accessToken}; path=/; secure=true; samesite=none`);
        res.setHeader('Set-Cookie', `accessToken=${accessToken}; path=/;`);

        return res.status(200).json(loginResult);
    } catch (err) {
        return next(err);
    }

};

const joinUser = async (req, res, next) => {
    try {
        const userResult = await userService.createUser(req.body);

        if (userResult.message !== 'success') {
            return next(userResult);
        }

        const loginResult = await userService.loginUser(userResult.result);

        if (loginResult.message !== 'success') {
            return next(loginResult);
        }

        // 쿠키 저장
        const accessToken = loginResult.result.accessToken;
        // res.setHeader('Set-Cookie', `accessToken=${accessToken}; Path=/; secure=true; samesite=none`);
        res.setHeader('Set-Cookie', `accessToken=${accessToken}; Path=/;`);

        return res.status(200).json(loginResult);
    } catch (err) {
        return next(err);
    }
};

const testCertNumber = async (req, res, next) => {
    try {
        const result = await userService.testCertNumber(req.body);

        if (result.message !== 'success') {
            return next(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
};

const sendCertNumber = async (req, res, next) => {
    try {
        const result = await userService.sendCertNumber(req.body);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
};

const checkCertNumber = async (req, res, next) => {
    try {
        const result = await userService.checkCertNumber(req.body);

        if (result.message !== 'success') {
            return next(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    getUserInfo,
    getUserTeamsInfo,
    loginUser,
    joinUser,
    updateUserInfo,
    testCertNumber,
    sendCertNumber,
    checkCertNumber,
};
