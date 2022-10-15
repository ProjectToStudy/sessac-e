const send = require('../utils/sendNotification');
const db = require('../models');

async function sendCertNumber (data) {
    const number = generateRandomNumber();
    const body = {
        type: 'SMS',
        from: '01052079385', // 사전 등록된 번호로만 발신 가능
        content: `[새싹이] 인증번호는 [${number}] 입니다 :)`,
        messages: [
            {
                to: data.phone,
                subject: 'a',
                contents: 'b',
            }
        ]
    };

    const result = await send.sendSms(body);

    if (result.statusCode !== '202') {
        return {
            code: 400301,
            result,
        };
    }

    try {
        await db.userCertificationHistory.create({
            phone: data.phone,
            certificationNumber: number,
        });
    } catch (err) {
        return {
            code: 400101,
        };
    }

    return {
        code: 200000,
        message: 'success',
    };
}

async function testCertNumber(data) {
    try {
        await db.userCertificationHistory.create({
            phone: data.phone,
            certificationNumber: 123456,
        });
    } catch (err) {
        return {
            code: 400101,
        };
    }

    return {
        code: 200000,
        message: 'success',
    };
}

async function checkCertNumber(data) {
    // TODO: 맞는 번호인지 체크해야 함
    // phone 번호로 컬럼 가져오기 -> 여러개인 경우? 무조건 가장 최신 데이터
    // 현재 시간과 비교해서 입력 시간이 3분 이상 차이나면 유효하지 않다는 에러 돌려주기
    try {
        const result = await db.userCertificationHistory.findAll({
            where: {
                phone: data.phone,
            },
            order: [
                ['createdAt', 'DESC']
            ],
            raw: true,
        });

        if (!data.certificationNumber) {
            return {
                code: 401001,
            }
        }

        if (result[0]['certificationNumber'] !== data.certificationNumber) {
            return {
                code: 401101
            }
        }
    } catch (err) {
        console.log(err);
        return {
            code: 400101,
        }
    }

    return {
        code: 200000,
        message: 'success',
    };
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000);
}

module.exports = {
    sendCertNumber,
    testCertNumber,
    checkCertNumber,
}
