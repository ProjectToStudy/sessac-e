const path = require('path');
const os = require('os');
const fs = require('fs');

const Busboy = require('busboy');

const parseFormData = async (req, res) => {
    return new Promise((resolve, reject) => {
        const busboy = Busboy({headers: req.headers});
        const data = {};
        const files = [];
        let filepath = '';
        let fileData = '';

        busboy.on('field', async (fieldName, val) => {
            if (fieldName === 'image') {
                // throw 4005;
                console.log('dd')
            }
            data[fieldName] = val;
        });

        busboy.on('file', async (name, file, info) => {
            let {filename, encoding, mimeType} = info;
            // 이미지 형식 처리하는 함수 필요
            if (mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/jpg') {
                mimeType = mimeType;
            } else if (mimeType === 'application/octet-stream') {
                mimeType = 'image/jpg';
            } else {
                // throw 4006;
                console.log('ddd');
            }

            const tempFilePath = path.join(os.tmpdir(), filename);
            file.pipe(fs.createWriteStream(tempFilePath));

            files.push({
                filename,
                mimeType,
                path: tempFilePath,
            });
            // const {fileName, encoding, mimeType} = info;
            // let imageType = '';
            //
            //
            // filepath = path.join(os.tmpdir(), 'name');
            // file.pipe(fs.createWriteStream(filepath));
            //
            // files.push({
            //     fileName,
            //     mimeType,
            //     stream: file
            // })

            // file.on('end', () => {
            //     // fileData = {filepath, imageType, fileName};
            //     fileData = files;
            // });
            // fileData = {filepath, imageType, file};
        });

        // busboy.end(req.rawBody);

        busboy.on('finish', () => {
            resolve({
                field: data,
                files
            });
        });

        req.pipe(busboy);
        //
        // return {
        //     field: data,
        //     file: fileData,
        // }
    });
}

module.exports = {
    parseFormData,
}
