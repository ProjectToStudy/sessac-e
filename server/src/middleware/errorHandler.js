// import { logger } from '../utils/logger';

const errorHandler = (err, req, res) => {
    let message;
    let result = {};
    const code = err.code ? err.code : 400000;
    const returnCode = parseInt(code.toString().substring(0, 3));

    // TODO: message 수정하기, 정렬
    switch (code) {
        case 400301:
            message = '인증번호 전송에 실패했습니다';
            result = err.result;
            break;
        case 400101:
            // 데이터 오류
            message = '인증번호 저장 및 호출에 실패했습니다';
            break;
        case 401101:
            message = '인증번호가 잘못되었습니다';
            break;
        case 401001:
            message = '인증번호가 입력되지 않았습니다';
            break;
        case 400102:
            message = '회원정보 저장 및 호출에 실패했습니다';
            break;
        case 401002:
            message = '회원가입이 필요합니다';
            break;
        case 404000:
            message = '존재하지 않는 URL 입니다';
            break;
        default:
            message = '';
            break;
    }

    // logger.error(`${req.url} [${returnCode}][${err}]${message}`);

    return res
        .status(returnCode)
        .json({
            code,
            message,
            result,
    });
}

module.exports = {
    errorHandler,
}
