const cloudinary = require('cloudinary').v2;
const appRoot = require('app-root-path');

cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`
});

class cloudinaryUpload {
    uploadSingle(file) {
        console.log('file.filename', file.filename);
        console.log('file.path', file.path);
        console.log('appRoot', appRoot);
        return new Promise(resolve => {
            cloudinary.uploader.upload(file.filename, {
                    folder: 'tham-my-vien/customers',
                })
                .then(result => {
                    console.log('result 1', result);
                    if (result) {
                        const fs = require('fs');
                        fs.unlinkSync(file.filename);
                        resolve({
                            url: result.secure_url
                        })
                    }
                })
        })
    }

    uploadMultiple(file) {
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, {
                    folder: path + '/src/public/img/uploads/customers/',
                })
                .then(result => {
                    if (result) {
                        const fs = require('fs')
                        fs.unlinkSync(file)
                        resolve({
                            url: result.secure_url,
                            id: result.public_id,
                            thumb1: self.reSizeImage(result.public_id, 150, 150),
                            main: self.reSizeImage(result.public_id, 245, 245),
                            thumb2: self.reSizeImage(result.public_id, 200, 200)
                        })
                    }
                })
        })
    }

    reSizeImage(id, h, w) {
        return cloudinary.url(id, {
            height: h,
            width: w,
            crop: 'scale',
            format: 'jpg, png'
        })
    }
}

module.exports = new cloudinaryUpload;