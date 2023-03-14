const multer = require('multer');
const helpers = require('./helpers');
const storage = require('./storage');

var maxSize = 20 * 1024 *1024;
class validateUpload {
    
    // 'profile_pic' is the name of our file input field in the HTML form
    uploadSingleCustomer = multer({ fileFilter: helpers.imageFilter, storage: storage.storageCustomerAvt }).single('image');
    uploadSingleUser = multer({ fileFilter: helpers.imageFilter, storage: storage.storageUserAvt }).single('image');
    uploadSingleUserEdit = multer({ fileFilter: helpers.imageFilter, storage: storage.storageUserAvtEdit }).single('image');
    beforeCounselorUpload = multer({ fileFilter: helpers.filter, storage: storage.beforeCounselorUpload }).any('beforeCounselor');
    counselorUpload = multer({ fileFilter: helpers.filter, storage: storage.counselorUpload }).any('counselor');
    beforeUpload = multer({ fileFilter: helpers.filter, storage: storage.beforeUpload }).any('before');
    inSurgeryUpload = multer({ fileFilter: helpers.filter, storage: storage.inSurgeryUpload }).any('inSurgery');
    afterUpload = multer({ fileFilter: helpers.filter, storage: storage.afterUpload }).any('after');
    woundCleaningUpload = multer({ fileFilter: helpers.filter, storage: storage.woundCleaningUpload }).any('woundCleaning');
    reExaminationUpload = multer({ fileFilter: helpers.filter, storage: storage.reExaminationUpload }).any('reExamination');
}

module.exports = new validateUpload;
