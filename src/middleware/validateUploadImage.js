const multer = require('multer');
const helpers = require('./helpers');
const storage = require('./storage');

class validateUploadImage {
    
    // 'profile_pic' is the name of our file input field in the HTML form
    uploadSingleCustomer = multer({ fileFilter: helpers.imageFilter, storage: storage.storageCustomerAvt  }).single('image');
    uploadSingleUser = multer({  fileFilter: helpers.imageFilter, storage: storage.storageUserAvt }).single('image');
    uploadSingleUserEdit = multer({  fileFilter: helpers.imageFilter, storage: storage.storageUserAvtEdit }).single('image');
    counselorUploadGoogleDrive = multer({  fileFilter: helpers.videoFilter, storage: storage.counselorUploadGoogleDrive }).array('counselor');
    beforeUploadGoogleDrive = multer({  fileFilter: helpers.videoFilter, storage: storage.beforeUploadGoogleDrive }).array('before');
    afterUploadGoogleDrive = multer({  fileFilter: helpers.videoFilter, storage: storage.afterUploadGoogleDrive }).array('after');
    reExaminationUploadGoogleDrive = multer({  fileFilter: helpers.videoFilter, storage: storage.reExaminationUploadGoogleDrive }).array('reExamination');
}

module.exports = new validateUploadImage;
