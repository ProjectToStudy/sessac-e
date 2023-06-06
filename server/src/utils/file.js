const AWS = require('aws-sdk');
const fs = require('fs');

const config = require('../config');

// AWS 계정 자격 증명 정보 설정
AWS.config.update({
    accessKeyId: config.s3.accessKey || '',
    secretAccessKey: config.s3.secretKey || '',
});

// S3 객체 생성
const s3 = new AWS.S3();

// S3 버킷 이름
const bucketName = 'sessac-e';

const uploadFile = (files) => {
    return new Promise((resolve, reject) => {
        let uploadCount = 0;
        let successCount = 0;
        let failureCount = 0;
        const successFileArray = [];

        files.forEach(file => {
            // 파일 읽기
            const fileData = fs.readFileSync(file.path);

            // S3에 파일 업로드
            const uploadParams = {
                Bucket: bucketName,
                Key: file.filename, // 업로드된 파일의 이름
                Body: fileData
            };

            s3.upload(uploadParams, function(err, data) {
                uploadCount++;

                if (err) {
                    console.error('S3 업로드 에러:', err);
                    failureCount++;
                } else {
                    console.log(`${file.filename} 파일이 성공적으로 S3에 업로드되었습니다.`);
                    console.log('S3 업로드 결과:', data);
                    successFileArray.push({
                        imageUrl: data.Location,
                        sortRank: successCount,
                    });
                    successCount++;
                }

                // 모든 파일 업로드 완료
                if (uploadCount === files.length) {
                    if (failureCount === 0) {
                        resolve({
                            success: true,
                            successFileArray,
                        }); // 모든 파일 업로드 성공
                    } else {
                        resolve({
                            success: false,
                        }); // 파일 업로드 중 실패가 발생한 경우
                    }
                }
            });
        });
    });
}

module.exports = {
    uploadFile,
}
