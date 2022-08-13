const cloudinary = require('cloudinary').v2;
const appRoot = require('app-root-path');
const path = require('path');
require('dotenv').config();

cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`
});

class cloudinaryUpload {
    uploadSingle(req, res, next) {
        console.log('file.filename', req.file);
        console.log('file.path', req.path);
        console.log('appRoot', appRoot);
        return new Promise(resolve => {
            cloudinary.uploader.upload(req.file.filename, {
                    folder: 'tham-my-vien/users',
                })
                .then(result => {
                    console.log('result 1', result);
                    if (result) {
                        const fs = require('fs');
                        fs.unlinkSync(req.filename);
                        resolve({
                            url: result.secure_url
                        })
                    }
                })
                next()
        })
    }

    uploadMultiple(req, res, next) {
        return new Promise(resolve => {
            cloudinary.uploader.upload(req, {
                    folder: appRoot + '/src/public/img/uploads/users/',
                })
                .then(result => {
                    if (result) {
                        const fs = require('fs')
                        fs.unlinkSync(req)
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
        next()
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