const cloudinaryUpload = require('./cloudinaryUpload');
const path = require('path');

class cloudinaryStorage {
    storageSingle(file) {
        //req.file.path chính là đường dẫn của file khi upload bằng multer
        console.log('req file path', file);
        // cloudinaryUpload.uploadSingle(file.path).then((result) => {
        //     let imageDetails = {
        //         imageName: req.body.imageName || '',
        //         cloudImage: result.url,
        //         imageId: result.id
        //     }
        // })
        // res.json(file)
    }


    //up multiple files
    storageMultiple(req, res, next) {
        //req.files chính là khi upload multiple images
        let res_promises = req.files.map(file => new Promise((resolve, reject) => {
            cloudinaryUpload.uploadMultiple(file.path).then((result) => {
                resolve(result);
            })
        }))
        
        // Promise.all get imgas
        Promise.all(res_promises)
        .then((arrImg) => {
           //arrImg chính là array mà chúng ta đã upload 
           // các bạn có thể sử dụng arrImg để save vào database, hay hơn thì sử dụng mongodb
           res.json(req.files)
        })
        .catch((error) => {
            console.error('> Error>', error);
        })
        next();
    }
}

module.exports = new cloudinaryStorage;