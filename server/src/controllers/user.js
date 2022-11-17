const send = require('../utils/sendNotification');
const db = require('../models');
const jwt = require('../utils/jwt');
const redisClient = require('../utils/redis');
const datetime = require('../utils/datetime');

async function sendCertNumber(data) {
    const number = generateRandomNumber();
    const phone = data.phone.replace(/ /g, '');
    const body = {
        type: 'SMS',
        from: '01052079385', // 사전 등록된 번호로만 발신 가능
        content: `[새싹이] 인증번호는 [${number}] 입니다 :)`,
        messages: [
            {
                to: phone,
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
            phone,
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
    const phone = data.phone.replace(/ /g, '');

    try {
        await db.userCertificationHistory.create({
            phone,
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

        if (!datetime.compareToCurrentTime(datetime.addDatetime('s', 180, result[0].createdAt))) {
            // 인증번호 유효시간 지남
            return {
                code : 401201,
            }
        }

        if (result[0].certificationNumber !== data.certificationNumber) {
            if (result[0].failCount > 4) {
                // 인증번호 입력 횟수 5회 초과
                return {
                    code: 401301,
                }
            }

            await db.userCertificationHistory.update({
                failCount: result[0].failCount + 1,
            }, {
                where: {
                    id: result[0].id,
                },
            });

            return {
                code: 401101,
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

async function getUser(data) {
    try {
        const result = await db.userRequiredInfo.findOne({
            attributes: ['id', 'phone'],
            where: {
                phone: data.phone,
                isActive: true,
            },
            raw: true,
        });

        if (result) {
            return {
                code: 200000,
                message: 'success',
                result
            }
        } else {
            return {
                code: 401002,
            }
        }
    } catch (err) {
        console.log(err);
        return {
            code: 400102,
        }
    }
}

async function createUser(data) {
    try {
        const user = await db.userRequiredInfo.create({
            phone: data.phone,
        });

        return {
            code: 201000,
            message: 'success',
            result: {
                id: user.id,
                phone: user.phone,
            }
        }
    } catch (err) {
        console.log(err);
        return {
            code: 400102,
        }
    }

}

async function loginUser(data) {
    // token 발급
    const accessToken = jwt.sign(data);
    const refreshToken = jwt.refresh();

    // refreshToken redis 저장
    redisClient.set(data.phone, refreshToken);

    return {
        code: 200000,
        message: 'success',
        result: {
            accessToken,
            refreshToken,
        }
    }
}

module.exports = {
    sendCertNumber,
    testCertNumber,
    checkCertNumber,
    getUser,
    createUser,
    loginUser,
}
