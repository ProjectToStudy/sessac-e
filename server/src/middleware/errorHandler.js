// import { logger } from '../utils/logger';

const errorHandler = (err, req, res) => {
    let message;
    let result = err.result ? err.result : err;
    const code = err.code ? err.code : 500000;
    let returnCode = parseInt(code.toString().substring(0, 3));

    // TODO: message 수정하기, 정렬
    switch (code) {
        case 400000:
            message = '필수 파라미터가 누락되었습니다';
            break;
        case 400301:
            message = '인증번호 전송에 실패했습니다';
            result = err.result;
            break;
        case 400101:
            // 데이터 오류
            message = '인증번호 저장 및 호출에 실패했습니다';
            break;
        case 401001:
            message = '인증번호가 입력되지 않았습니다';
            break;
        case 401101:
            message = '인증번호가 잘못되었습니다';
            break;
        case 401201:
            message = '유효시간이 지난 인증번호입니다';
            break;
        case 401301:
            message = '인증번호 입력 횟수를 초과했습니다';
            break;
        case 400102:
            // 데이터 오류
            message = '회원정보 저장 및 호출에 실패했습니다';
            break;
        case 400555:
            message = '중복된 데이터가 존재합니다';
            break;
        case 401002:
            message = '회원가입이 필요합니다';
            break;
        case 401102:
            message = '회원정보를 가져올 수 없습니다';
            break;
        case 404000:
            message = '존재하지 않는 URL 입니다';
            break;
        case 400666:
            message = '데이터가 존재하지 않습니다';
            returnCode = 200;
            break;
        default:
            message = err.message ? err.message : '서버 에러가 발생했습니다';
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
};

module.exports = {
    errorHandler,
};
