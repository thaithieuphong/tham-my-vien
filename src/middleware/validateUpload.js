const multer = require('multer');
const helpers = require('./helpers');
const storage = require('./storage');

var maxSize = 20 * 1024 * 1024;
class validateUpload {
    
    // 'profile_pic' is the name of our file input field in the HTML form
    uploadSingleCustomer = multer({ fileFilter: helpers.imageFilter, storage: storage.storageCustomerAvt }).single('image');
    uploadSingleUser = multer({ fileFilter: helpers.imageFilter, storage: storage.storageUserAvt }).single('image');
    uploadSingleUserEdit = multer({ fileFilter: helpers.imageFilter, storage: storage.storageUserAvtEdit }).single('image');
    beforeCounselorUpload = multer({ fileFilter: helpers.imageFilter, storage: storage.beforeCounselorUpload, limits: { fileSize: maxSize } }).any('beforeCounselor');
    counselorUploadImg = multer({ fileFilter: helpers.imageFilter, storage: storage.counselorUploadImg, limits: { fileSize: maxSize } }).any('counselor');
    counselorUploadVideo = multer({ fileFilter: helpers.videoFilter, storage: storage.counselorUploadVideo, limits: { fileSize: maxSize } }).any('counselor');
    beforeUploadImg = multer({ fileFilter: helpers.imageFilter, storage: storage.beforeUploadImg, limits: { fileSize: maxSize } }).any('before');
    beforeUploadVideo = multer({ fileFilter: helpers.videoFilter, storage: storage.beforeUploadVideo, limits: { fileSize: maxSize } }).any('before');
    inSurgeryUploadImg = multer({ fileFilter: helpers.imageFilter, storage: storage.inSurgeryUploadImg, limits: { fileSize: maxSize } }).any('inSurgery');
    inSurgeryUploadVideo = multer({ fileFilter: helpers.videoFilter, storage: storage.inSurgeryUploadVideo, limits: { fileSize: maxSize } }).any('inSurgery');
    afterUploadImg = multer({ fileFilter: helpers.imageFilter, storage: storage.afterUploadImg, limits: { fileSize: maxSize } }).any('after');
    afterUploadVideo = multer({ fileFilter: helpers.videoFilter, storage: storage.afterUploadVideo, limits: { fileSize: maxSize } }).any('after');
    woundCleaningUploadImg = multer({ fileFilter: helpers.imageFilter, storage: storage.woundCleaningUploadImg, limits: { fileSize: maxSize } }).any('woundCleaning');
    woundCleaningUploadVideo = multer({ fileFilter: helpers.videoFilter, storage: storage.woundCleaningUploadVideo, limits: { fileSize: maxSize } }).any('woundCleaning');
    reExaminationUploadImg = multer({ fileFilter: helpers.imageFilter, storage: storage.reExaminationUploadImg, limits: { fileSize: maxSize } }).any('reExamination');
    reExaminationUploadVideo = multer({ fileFilter: helpers.videoFilter, storage: storage.reExaminationUploadVideo, limits: { fileSize: maxSize } }).any('reExamination');
}

module.exports = new validateUpload;
