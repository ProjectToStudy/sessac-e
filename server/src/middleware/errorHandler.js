// import { logger } from '../utils/logger';

const errorHandler = (err, req, res) => {
    let returnCode;
    let message;

    console.log(err);

    switch (err.errorCode) {
        case 'ER0001':
            returnCode = 400;
            message = '인증번호 전송에 실패했습니다';
            break;
        case 'ER0002':
            returnCode = 400;
            message = '데이터 삽입에 실패했습니다';
            break;
        case 'ER0003':
            returnCode = 400;
            message = '데이터 호출에 실패했습니다';
            break;
        case 'ER1001':
            returnCode = 200;
            message = '인증번호가 잘못되었습니다';
            break;
        default:
            returnCode = 400;
            message = '';
            break;
    }

    // logger.error(`${req.url} [${returnCode}][${err}]${message}`);

    return res.status(returnCode).json({
        message: message,
        result: err.errorCode,
        content: err.content,
    });
}

module.exports = {
    errorHandler,
}
