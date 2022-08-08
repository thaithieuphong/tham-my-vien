const multer = require('multer');
const helpers = require('./helpers');
const storage = require('./storage');

class validateUpload {
    
    // 'profile_pic' is the name of our file input field in the HTML form
    uploadSingleCustomer = multer({ fileFilter: helpers.imageFilter, storage: storage.storageCustomerAvt }).single('image');
    uploadSingleUser = multer({ fileFilter: helpers.imageFilter, storage: storage.storageUserAvt }).single('image');
    uploadSingleUserEdit = multer({ fileFilter: helpers.imageFilter, storage: storage.storageUserAvtEdit }).single('image');
    counselorUpload = multer({ fileFilter: helpers.filter, storage: storage.counselorUpload }).array('counselor', 20);
    beforeUpload = multer({ fileFilter: helpers.filter, storage: storage.beforeUpload }).array('before');
    afterUpload = multer({ fileFilter: helpers.filter, storage: storage.afterUpload }).array('after');
    reExaminationUpload = multer({  fileFilter: helpers.filter, storage: storage.reExaminationUpload }).array('reExamination');
}

module.exports = new validateUpload;
