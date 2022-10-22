// sms 전송과 관련된 모듈
const request = require('request');
const CryptoJS = require('crypto-js');

async function callApi(uri, method, body, headers) {
    let requestData = {};
    const options = {
        method: method,
        body: body,
        headers: headers,
    };

    await new Promise((resolve) => {
        request(uri, options, (error, response, body) => {
            resolve(body);
        });
    }).then((data) => {
        requestData = data;
    });

    return JSON.parse(requestData);
}

async function sendSms(params) {
    // 추후 환경변수로 분리
    const now = Date.now().toString();
    const accessKey = 'NT7PWRBdA6pR1YtOe0Ei';
    const secretKey = 'vfM5K5jaRReABjImZ2LHaoCOUTXZcoML2tP0aFzM';
    const serviceId = 'ncp:sms:kr:260595168732:sessac-e';
    const uri = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const signature = makeSignature(now, accessKey, secretKey, serviceId);

    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': now,
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-signature-v2': signature,
    };

    return await callApi(uri, 'post', JSON.stringify(params), headers);
}

function makeSignature(now, accessKey, secretKey, serviceId) {
    const space = ' ';				// one space
    const newLine = '\n';				// new line
    const method = 'POST';				// method
    const uri = `/sms/v2/services/${serviceId}/messages`;

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(uri);
    hmac.update(newLine);
    hmac.update(now);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
}

module.exports = {
    sendSms,
};
