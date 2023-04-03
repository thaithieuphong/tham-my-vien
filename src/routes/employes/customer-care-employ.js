const express = require('express');
const EmployCustomerCareController = require('../../app/controllers/customer-care-controller/EmployCustomerCareController');
const router = express.Router();
const AuthController = require('../../app/controllers/AuthController');
const validateUploadImage = require('../../middleware/validateUpload');

/* Business Employ Start*/

// Thay đổi mật khẩu
router.post('/change-pass', AuthController.changePassword);

// Lưu trữ hồ sơ khách hàng
router.patch('/customers/:id/storage', EmployCustomerCareController.storageCustomer);

// Xóa phiếu tái khám định kỳ
router.delete('/re-exam/:id/delete', EmployCustomerCareController.deleteReExam);

// Khôi phục phiếu tái khám định kỳ
router.patch('/re-exam/:id/restore', EmployCustomerCareController.restoreReExam);

// Cập nhật phiếu tái khám định kỳ hoàn thành
router.patch('/re-exam/:id/done', EmployCustomerCareController.updateReExamDone);

// Upload hình phiếu tái khám
router.post('/re-exam/:id/uploadImages',  validateUploadImage.reExaminationUploadImg,  EmployCustomerCareController.uploadReExamImg);

// Upload video phiếu tái khám
router.post('/re-exam/:id/uploadVideos',  validateUploadImage.reExaminationUploadVideo,  EmployCustomerCareController.uploadReExamVideo);

// Cập nhật content phiếu tái khám
router.post('/re-exam/:id/upload',  EmployCustomerCareController.uploadReExam);

// Xóa nhiều hình ảnh thay băng cắt chỉ trên phiếu tái khám
router.delete('/re-exam/:id/delete-multi-img', EmployCustomerCareController.deleteMultipleReExaminationImg);

// Xóa hình ảnh thay băng cắt chỉ trên phiếu tái khám
router.delete('/re-exam/:id/delete-img', EmployCustomerCareController.deleteReExamImg);

// Khôi phục nhiều hình ảnh thay băng cắt chỉ trên phiếu tái khám
router.patch('/re-exam/:id/restore-multi-img', EmployCustomerCareController.restoreMultipleReExaminationImg);

// Khôi phục hình ảnh thay băng cắt chỉ trên phiếu tái khám
router.patch('/re-exam/:id/restore-img', EmployCustomerCareController.restoreReExamImg);

// Xóa nhiều video thay băng cắt chỉ trên phiếu tái khám
router.delete('/re-exam/:id/delete-multi-video', EmployCustomerCareController.deleteMultipleReExaminationVideo);

// Xóa video thay băng cắt chỉ trên phiếu tái khám
router.delete('/re-exam/:id/delete-video', EmployCustomerCareController.deleteReExamVideo);

// Khôi phục nhiều video thay băng cắt chỉ trên phiếu tái khám
router.patch('/re-exam/:id/restore-multi-video', EmployCustomerCareController.restoreMultipleReExaminationVideo);

// Khôi phục video thay băng cắt chỉ trên phiếu tái khám
router.patch('/re-exam/:id/restore-video', EmployCustomerCareController.restoreReExamVideo);

// Tạo phiếu tái khám định kỳ (đang chỉnh sửa)
router.post('/create-re-exam', EmployCustomerCareController.createReExam);

// Hiển thị trang cập nhật phiếu thay băng
router.get('/re-exam/:id/update', EmployCustomerCareController.showReExamUpdate);

// Hiển thị trang khôi phục phiếu tái khám
router.get('/re-exam/trash', EmployCustomerCareController.showReExaminationTrash);

// Hiển thị trang danh sách phiếu tái khám
router.get('/re-exam', EmployCustomerCareController.showReExamination);

// Hiển thị trang chi tiết lịch hẹn tái khám
// router.get('/re-exam-schedule/:id/detail', EmployCustomerCareController.showReExamScheduleDetail);

// Khôi phục lịch hẹn tái khám định kỳ
router.patch('/re-exam-schedule/:id/restore', EmployCustomerCareController.restoreReExamSchedule);

// Xóa lịch hẹn tái khám định kỳ
router.delete('/re-exam-schedule/:id/delete', EmployCustomerCareController.deleteReExamSchedule);

// Sửa lịch hẹn tái khám định kỳ
router.patch('/re-exam-schedule/:id/edit', EmployCustomerCareController.editReExamSchedule);

// Hiển thị trang khôi phục lịch hẹn tái khám
router.get('/re-exam-schedule/trash', EmployCustomerCareController.showReExaminationScheduleTrash);

// Hiển thị trang lịch hẹn tái khám
router.get('/re-exam-schedule', EmployCustomerCareController.showReExaminationSchedule);

// Tạo lịch hẹn tái khám
router.post('/customers/:id/create-re-exam-schedule', EmployCustomerCareController.createReExamSchedule);

// Hiển thị trang danh sách khách hàng tái khám định kỳ
router.get('/customer-re-exam', EmployCustomerCareController.showCustomerReExamination);

// Cập nhật phiếu thay băng hoàn thành
router.patch('/wound-cleaning/:id/done', EmployCustomerCareController.updateWoundCleaningDone);

// Chuyển khách hàng sang tái khám định kỳ
router.patch('/customer/:id/move-to-re-exam', EmployCustomerCareController.moveToReExamination);

// Xóa phiếu thay băng cắt chỉ
router.delete('/wound-cleaning/:id/delete', EmployCustomerCareController.deleteWoundCleaning);

// Khôi phục phiếu thay băng cắt chỉ
router.patch('/wound-cleaning/:id/restore', EmployCustomerCareController.restoreWoundCleaning);

// Upload hình phiếu tái khám
router.post('/wound-cleaning/:id/uploadImages',  validateUploadImage.woundCleaningUploadImg,  EmployCustomerCareController.uploadWoundCleaningImg);

// Upload video phiếu tái khám
router.post('/wound-cleaning/:id/uploadVideos',  validateUploadImage.woundCleaningUploadVideo,  EmployCustomerCareController.uploadWoundCleaningVideo);

// Upload hình và video phiếu thay băng
router.post('/wound-cleaning/:id/update', EmployCustomerCareController.updateWoundCleaning);

// Xóa nhiều hình ảnh thay băng cắt chỉ trên phiếu thay băng
router.delete('/wound-cleaning/:id/delete-multi-img-wound-cleaning', EmployCustomerCareController.deleteMultipleWoundCleaningImg);

// Xóa hình ảnh thay băng cắt chỉ trên phiếu thay băng
router.delete('/wound-cleaning/:id/delete-img-wound-cleaning', EmployCustomerCareController.deleteWoundCleaningImg);

// Khôi phục nhiều hình ảnh thay băng cắt chỉ trên phiếu thay băng
router.patch('/wound-cleaning/:id/restore-multi-img-wound-cleaning', EmployCustomerCareController.restoreMultipleWoundCleaningImg);

// Khôi phục hình ảnh thay băng cắt chỉ trên phiếu thay băng
router.patch('/wound-cleaning/:id/restore-img-wound-cleaning', EmployCustomerCareController.restoreWoundCleaningImg);

// Xóa nhiều video thay băng cắt chỉ trên phiếu thay băng
router.delete('/wound-cleaning/:id/delete-multi-video-wound-cleaning', EmployCustomerCareController.deleteMultipleWoundCleaningVideo);

// Xóa video thay băng cắt chỉ trên phiếu thay băng
router.delete('/wound-cleaning/:id/delete-video-wound-cleaning', EmployCustomerCareController.deleteWoundCleaningVideo);

// Khôi phục nhiều video thay băng cắt chỉ trên phiếu thay băng
router.patch('/wound-cleaning/:id/restore-multi-video-wound-cleaning', EmployCustomerCareController.restoreMultipleWoundCleaningVideo);

// Khôi phục video thay băng cắt chỉ trên phiếu thay băng
router.patch('/wound-cleaning/:id/restore-video-wound-cleaning', EmployCustomerCareController.restoreWoundCleaningVideo);

// Tạo phiếu thay băng
router.post('/create-wound-cleaning', EmployCustomerCareController.createWoundCleaning);

// Hiển thị trang cập nhật phiếu thay băng
router.get('/wound-cleaning/:id/update', EmployCustomerCareController.showWoundCleaningUpdate);

// Hiển thị trang khôi phục phiếu thay băng
router.get('/wound-cleaning/trash', EmployCustomerCareController.showWoundCleaningTrash);

// Hiển thị trang phiếu thay băng
router.get('/wound-cleaning', EmployCustomerCareController.showWoundCleaning);

// Hiển thị trang chi tiết phiếu thay băng
router.get('/wound-cleaning/:id/detail', EmployCustomerCareController.showWoundCleaningDetail);

// Khôi phục lịch hẹn thay băng cắt chỉ
router.patch('/wound-cleaning-schedule/:id/restore', EmployCustomerCareController.restoreWoundCleaningSchedule);

// Xóa lịch hẹn thay băng cắt chỉ
router.delete('/wound-cleaning-schedule/:id/delete', EmployCustomerCareController.deleteWoundCleaningSchedule);

// Sửa lịch hẹn thay băng cắt chỉ
router.patch('/wound-cleaning-schedule/:id/edit', EmployCustomerCareController.editWoundCleaningSchedule);

// Tạo lịch hẹn thay băng cắt chỉ
router.post('/customers/:id/create-wound-cleaning-schedule', EmployCustomerCareController.createWoundCleaningSchedule);

// Hiển thị trang chi tiết lịch hẹn thay băng
// router.get('/wound-cleaning-schedule/:id/detail', EmployCustomerCareController.showWoundCleaningScheduleDetail);

// Hiển thị trang khôi phục lịch hẹn thay băng
router.get('/wound-cleaning-schedule/trash', EmployCustomerCareController.showWoundCleaningScheduleTrash);

// Hiển thị trang lịch hẹn thay băng
router.get('/wound-cleaning-schedule', EmployCustomerCareController.showWoundCleaningSchedule);

// Hiển thị trang danh sách khách hàng thay băng cắt chỉ
router.get('/customers-wound-cleaning', EmployCustomerCareController.showCustomerWoundCleaning);

// Hiển thị trang chi tiết phiếu tái khám
router.get('/re-exam/:id/detail', EmployCustomerCareController.showReExaminationDetail);

// Hiển thị chi tiết khách hàng
router.get('/customers/:id/detail', EmployCustomerCareController.showCustomerDetail);

// Hiển thị chi tiết khách hàng trong kho lưu trữ
router.get('/storage/:id/detail', EmployCustomerCareController.showCustomerStorageDetail);

// Hiển thị kho lưu trữ (chỉnh sửa)
router.get('/storage', EmployCustomerCareController.showStorage);

// Hiển thị trang thông tin cá nhân
router.get('/profile', EmployCustomerCareController.showProfile);

// Hiển thị trang chính
router.get('/', EmployCustomerCareController.showDashboard);
/* Business Employ End*/

module.exports = router;
