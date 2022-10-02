const send = require('../utils/sendNotification');

const sendAuthSms = async (req, res) => {
    console.log('메세지 전송 API 실행');

    const body = {
        type: 'SMS',
        from: '01052079385', // 사전 등록된 번호로만 발신 가능
        content: '[새싹이] 인증번호는 0000 입니다 :)',
        messages: [
            {
                to: '01052079385',
                subject: 'a',
                contents: 'b',
            }
        ]
    };

    await send.sendSms(body)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });

    return res.status(200).end();
};

module.exports = {
    sendAuthSms,
}
