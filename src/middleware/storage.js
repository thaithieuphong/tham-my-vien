const multer = require('multer');
const path = require('path');
const rootPath = path.sep;
const User = require('../app/models/User');
const Customer = require('../app/models/Customer');
const appRoot = require('app-root-path');
const fs = require('fs');


// create avatar customer    
const storageCustomerAvt = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/img/uploads/customers/');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/customers/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const beforeCounselorUpload = multer.diskStorage({
    destination: function(req, file, cb) {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/avif' || file.mimetype === 'image/webp') {
            // cb(null, appRoot + '/src/public/beforeCounselor/img');
            cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/beforeCounselor/img');

        }
        else if (file.mimetype === 'video/avi' || file.mimetype === 'video/flv' || file.mimetype === 'video/wmv' || file.mimetype === 'video/mov' || file.mimetype === 'video/mov' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
            // cb(null, appRoot + '/src/public/beforeCounselor/video');
            cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/beforeCounselor/video');
        }
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = 'createdAt-' + getDate + (getMonth + 1) + getYear;
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/avif' || file.mimetype === 'image/webp') {
            cb(null, `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
        } else if (file.mimetype === 'video/avi' || file.mimetype === 'video/flv' || file.mimetype === 'video/wmv' || file.mimetype === 'video/mov' || file.mimetype === 'video/mov' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
            cb(null, `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
        }
    }
});

// Vị trí lưu hình ảnh
const counselorUploadImg = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/counselor/img');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/counselor/img');1
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Vị trí lưu video
const counselorUploadVideo = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/counselor/video');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/counselor/video');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Vị trí lưu hình ảnh
const beforeUploadImg = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/before/img');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/before/img'); 
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Vị trí lưu video
const beforeUploadVideo = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/before/video');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/before/video');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Vị trí lưu hình ảnh phẫu thuật
const inSurgeryUploadImg = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/in-surgery/img');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/in-surgery/img'); 
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Vị trí lưu video phẫu thuật
const inSurgeryUploadVideo = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/in-surgery/video');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/in-surgery/video'); 
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Vị trí lưu hình ảnh sau phẫu
const afterUploadImg = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/after/img');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/after/img');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Vị trí lưu video sau phẫu
const afterUploadVideo = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/after/video');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/after/video');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Vị trí lưu hình ảnh thay băng cắt chỉ
const woundCleaningUploadImg = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/wound-cleaning/img');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/wound-cleaning/img');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Vị trí lưu video thay băng cắt chỉ
const woundCleaningUploadVideo = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/wound-cleaning/video');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/wound-cleaning/video');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Vị trí lưu hình ảnh tái khám
const reExaminationUploadImg = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/re-examination/img');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/re-examination/img');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Vị trí lưu video tái khám
const reExaminationUploadVideo = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/re-examination/video');
        // cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/re-examination/video');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = `createdAt-${getDate}${(getMonth + 1)}${getYear}`;
        cb(null, `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const storageCustomerAvtEdit = multer.diskStorage({
    destination: function(req, file, cb) {
        // cb(null, appRoot + '/src/public/img/uploads/customers/');
        cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/customers/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const date = new Date();
        const getDate = date.getDate();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        const dateNow = 'createdAt-' + getDate + (getMonth + 1) + getYear;
        cb(null, file.fieldname + '-' + req.params._id + '-' + dateNow + '-' + Date.now() + path.extname(file.originalname));
    }
});


const storageUserAvt = multer.diskStorage({
    destination: function(req, file, cb) {
        // cb(null, appRoot + '/src/public/img/uploads/users/');
        cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/users/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

const storageUserAvtEdit = multer.diskStorage({
    destination: function(req, file, cb) {
        // cb(null, appRoot + '/src/public/img/uploads/users/');
        cb(null, rootPath + 'mnt/vdb/crm.drtuananh.vn/users/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        function convert_vi_to_en(str) {
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
            str = str.replace(/Đ/g, "D");
            str = str.replace(
                /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
                " "
            );
            str = str.replace(/  +/g, " ");
            return str;
        }
        User.findById( { _id:  req.params.id })
            .then(user => {
                const fName = convert_vi_to_en(user.firstName).split(' ');
                const lName = convert_vi_to_en(user.lastName).split(' ');
                const birth = user.birth.split('-');
                const newBirth = 'birth-' + birth[2] + birth[1] + birth[0];
                const date = new Date();
                const getDate = date.getDate();
                const getMonth = date.getMonth();
                const getYear = date.getFullYear();
                const dateNow = 'createdAt-' + getDate + (getMonth + 1) + getYear;
                let aFName;
                let bFName = "";
                let aLName;
                let bLName = "";
                fName.forEach(e => {
                    aFName = e.split(',');
                    bFName += aFName;
                });
                lName.forEach(el => {
                    aLName = el.split(', ');
                    bLName += aLName;
                })
                cb(null, file.fieldname + '-' + bFName.toLowerCase() + bLName.toLowerCase() + '-' + newBirth + '-' + dateNow + '-' + Date.now() + path.extname(file.originalname));
            })
    }
});

exports.storageCustomerAvt = storageCustomerAvt;
exports.storageUserAvt = storageUserAvt;
exports.storageUserAvtEdit = storageUserAvtEdit;
exports.storageCustomerAvtEdit = storageCustomerAvtEdit;
exports.beforeCounselorUpload = beforeCounselorUpload;
exports.counselorUploadImg = counselorUploadImg;
exports.counselorUploadVideo = counselorUploadVideo;
exports.beforeUploadImg = beforeUploadImg;
exports.beforeUploadVideo = beforeUploadVideo;
exports.inSurgeryUploadImg = inSurgeryUploadImg;
exports.inSurgeryUploadVideo = inSurgeryUploadVideo;
exports.afterUploadImg = afterUploadImg;
exports.afterUploadVideo = afterUploadVideo;
exports.woundCleaningUploadImg = woundCleaningUploadImg;
exports.woundCleaningUploadVideo = woundCleaningUploadVideo;
exports.reExaminationUploadImg = reExaminationUploadImg;
exports.reExaminationUploadVideo = reExaminationUploadVideo;
