const express = require('express');
const EmployBusinessController = require('../../app/controllers/business-controller/EmployBusinessController');
const router = express.Router();
const validateUploadImage = require('../../middleware/validateUpload');
const AuthController = require('../../app/controllers/AuthController');

/* Business Employ Start*/

// Yêu cầu cập nhật thông thông tin tư vấn khách hàng
router.patch('/customers/:id/comment', EmployBusinessController.createComment);

// Yêu cầu chuyển trạng thái khách hàng sang tiềm năng
router.patch('/customers/:id/potential', EmployBusinessController.moveToPotential);

// Yêu cầu chuyển trạng thái khách hàng sang tư vấn không thành công
router.patch('/customers/:id/notOK', EmployBusinessController.moveToNotOK);

// Yêu cầu chuyển trạng thái khách hàng sang đặt lịch
router.patch('/customers/:id/schedule', EmployBusinessController.moveToSchedule);

// Yêu cầu chỉnh sửa thông tin khách hàng
router.put('/customers/:id/edit', validateUploadImage.uploadSingleCustomer, EmployBusinessController.editCustomer);

// Yêu cầu xóa dịch vụ trong lịch hẹn tư vấn
router.delete('/schedule/:id/service/delete', EmployBusinessController.deleteServiceSchedule);

// Yêu cầu khôi phục lịch hẹn tư vấn đã xóa
router.patch('/schedule/:id/restore', EmployBusinessController.restoreSchedule);

// Yêu cầu xóa lịch hẹn tư vấn
router.delete('/schedule/:id/delete', EmployBusinessController.deleteSchedule);

// Yêu cầu chỉnh sửa lịch hẹn tư vấn
router.put('/schedule/:id/edit', EmployBusinessController.editSchedule);

// Yêu cầu tạo lịch hẹn tư vấn
router.post('/customers/:id/schedule/create', EmployBusinessController.createSchedule);

// Yêu cầu tạo thông tin khách hàng
router.post('/customers', validateUploadImage.uploadSingleCustomer, EmployBusinessController.createCustomer);

// // Yêu cầu tạo phiếu tái khám
// router.post('/schedule/exam', EmployBusinessController.createReExam);

// Yêu cầu thay đổi mật khẩu
router.post('/change-pass', AuthController.changePassword);

// Hiển thị trang chi tiết phiếu dịch vụ
router.get('/service-note/:id/detail', EmployBusinessController.showServiceNoteDetail);

// Upload hình tư vấn trực tiếp
router.post('/service-note/:id/uploadCounselorImages',  validateUploadImage.counselorUpload,  EmployBusinessController.uploadCounselorImg);

// Upload video tư vấn trực tiếp
router.post('/service-note/:id/uploadCounselorVideos',  validateUploadImage.counselorUpload,  EmployBusinessController.uploadCounselorVideo);

// Cập nhật thông tin tư vấn trực tiếp
router.post('/service-note/:id/operating-counselor', EmployBusinessController.updateCounselor);

// Xóa hình ảnh tư vấn trực tiếp trên phiếu dịch vụ
router.delete('/service-note/:id/delete-img-counselor', EmployBusinessController.deleteCounselorImg);

// Khôi phục hình ảnh tư vấn trực tiếp trên phiếu dịch vụ
router.patch('/service-note/:id/restore-img-counselor', EmployBusinessController.restoreCounselorImg);

// Xóa video tư vấn trực tiếp trên phiếu dịch vụ
router.delete('/service-note/:id/delete-video-counselor', EmployBusinessController.deleteCounselorVideo);

// Khôi phục video tư vấn trực tiếp trên phiếu dịch vụ
router.patch('/service-note/:id/restore-video-counselor', EmployBusinessController.restoreCounselorVideo);

// Upload hình trước phẫu thuật
router.post('/service-note/:id/uploadBeforeImages',  validateUploadImage.beforeUpload,  EmployBusinessController.uploadBeforeImg);

// Upload video trước phẫu thuật
router.post('/service-note/:id/uploadBeforeVideos',  validateUploadImage.beforeUpload,  EmployBusinessController.uploadBeforeVideo);

// Cập nhật thông tin trước phẫu thuật
router.post('/service-note/:id/operating-before', EmployBusinessController.updateBefore);

// Xóa hình ảnh trước phẫu thuật trên phiếu dịch vụ
router.delete('/service-note/:id/delete-img-before', EmployBusinessController.deleteBeforeImg);

// Khôi phục hình ảnh trước phẫu thuật trên phiếu dịch vụ
router.patch('/service-note/:id/restore-img-before', EmployBusinessController.restoreBeforeImg);

// Xóa video trước phẫu thuật trên phiếu dịch vụ
router.delete('/service-note/:id/delete-video-before', EmployBusinessController.deleteBeforeVideo);

// Khôi phục video trước phẫu thuật trên phiếu dịch vụ
router.patch('/service-note/:id/restore-video-before', EmployBusinessController.restoreBeforeVideo);

// Upload hình phẫu thuật
router.post('/service-note/:id/uploadInSurgeryImages',  validateUploadImage.inSurgeryUpload,  EmployBusinessController.uploadInSurgeryImg);

// Upload video phẫu thuật
router.post('/service-note/:id/uploadInSurgeryVideos',  validateUploadImage.inSurgeryUpload,  EmployBusinessController.uploadInSurgeryVideo);

// Cập nhật thông tin phẫu thuật
router.post('/service-note/:id/operating-in-surgery', EmployBusinessController.updateInSurgery);

// Xóa hình phẫu thuật trên phiếu dịch vụ
router.delete('/service-note/:id/delete-img-in-surgery', EmployBusinessController.deleteInSurgeryImg);

// Khôi phục hình ảnh phẫu thuật trên phiếu dịch vụ
router.patch('/service-note/:id/restore-img-in-surgery', EmployBusinessController.restoreInSurgeryImg);

// Xóa video phẫu thuật trên phiếu dịch vụ
router.delete('/service-note/:id/delete-video-in-surgery', EmployBusinessController.deleteInSurgeryVideo);

// Khôi phục video phẫu thuật trên phiếu dịch vụ
router.patch('/service-note/:id/restore-video-in-surgery', EmployBusinessController.restoreInSurgeryVideo);

// Upload hình sau phẫu thuật - thay băng lần đầu
router.post('/service-note/:id/uploadAfterImages',  validateUploadImage.afterUpload,  EmployBusinessController.uploadAfterImg);

// Upload video sau phẫu thuật - thay băng lần đầu
router.post('/service-note/:id/uploadAfterVideos',  validateUploadImage.afterUpload,  EmployBusinessController.uploadAfterVideo);

// Cập nhật thông tin sau phãu thuật - thay băng lần đầu
router.post('/service-note/:id/operating-after', EmployBusinessController.updateAfter);

// Xóa hình ảnh thay băng cắt chỉ trên phiếu dịch vụ
router.delete('/service-note/:id/delete-img-after', EmployBusinessController.deleteAfterImg);

// Khôi phục hình ảnh thay băng cắt chỉ trên phiếu dịch vụ
router.patch('/service-note/:id/restore-img-after', EmployBusinessController.restoreAfterImg);

// Xóa video thay băng cắt chỉ trên phiếu dịch vụ
router.delete('/service-note/:id/delete-video-after', EmployBusinessController.deleteAfterVideo);

// Khôi phục video thay băng cắt chỉ trên phiếu dịch vụ
router.patch('/service-note/:id/restore-video-after', EmployBusinessController.restoreAfterVideo);

// Xóa dịch vụ trên phiếu dịch vụ
router.delete('/service-note/service/:id/delete', EmployBusinessController.deleteService);

// Cập nhật dịch vụ trên phiếu dịch vụ
router.put('/service-note/:id/service-info', EmployBusinessController.updateServiceInfor);

// Cập nhật thông tin khách hàng trên phiếu dịch vụ
router.put('/service-note/:id/cus-info', EmployBusinessController.updateCusInfor);

// Tạo phiếu dịch vụ từ trang lịch hẹn tư vấn
router.get('/service-note/:id/update', EmployBusinessController.showServiceNoteUpdate);

// Yêu cầu khôi phục phiếu dịch vụ đã xóa
router.patch('/service-note/:id/restore', EmployBusinessController.restoreServiceNote);

// Yêu cầu xóa phiếu dịch vụ
router.delete('/service-note/:id/delete', EmployBusinessController.deleteServiceNote);

// Hiển thị trang danh sách phiếu dịch vụ đã xóa
router.get('/service-note/trash', EmployBusinessController.showServiceNoteTrash);

// Hiển thị trang danh sách phiếu dịch vụ
router.get('/service-note', EmployBusinessController.showServiceNoteList);

// Tạo phiếu dịch vụ từ trang lịch hẹn tư vấn
router.post('/schedule/:id/service-note/create', EmployBusinessController.serviceNoteCreate);

// Hiển thị trang chi tiết khách hàng
router.get('/customers/:id/detail', EmployBusinessController.showCustomerDetail);

// Hiển thị trang tạo lịch hẹn tư vấn
router.get('/customers/:id/schedule/create', EmployBusinessController.showCreateSchedule);

// Hiển thị trang cập nhật lịch hẹn tư vấn
router.get('/schedule/:id/edit', EmployBusinessController.showScheduleEdit);

// Hiển thị trang danh sách lịch hẹn tư vấn đã xóa
router.get('/schedules/trash', EmployBusinessController.showScheduleTrash);

// Hiển thị trang danh sách lịch hẹn tư vấn
router.get('/schedules', EmployBusinessController.showSchedules);

// Hiển thị trang chi tiết khách hàng ở trạng thái chăm sóc hậu phẫu
router.get('/customer/:id/discharge-from-hospital-detail', EmployBusinessController.showCustomerDischargeFromHospitalDetail);

// Cập nhật phiếu dịch vụ sang hoàn thành
router.patch('/service-note/:id/done', EmployBusinessController.serviceNoteDone);

// Hiển thị trang sửa thông tin khách hàng
router.get('/customers/:id/edit', EmployBusinessController.showCustomerEdit);

// Hiển thị trang tạo thông tin khách hàng
router.get('/customers/create', EmployBusinessController.showCustomerCreate);

// Hiển thị trang danh sách khách hàng trạng thái hoàn thành phẫu thuật (Cần chỉnh sửa)
router.get('/customers/done', EmployBusinessController.showCustomerDone);

// Hiển thị trang danh sách khách hàng trạng thái chăm sóc hậu phẫu
router.get('/customers/discharge-from-hospital', EmployBusinessController.showCustomerDischargeFromHospital);

// Hiển thị trang danh sách khách hàng trạng thái tư vấn không thành công
router.get('/customers/notok', EmployBusinessController.showCustomerNotOK);

// Hiển thị trang danh sách khách hàng trạng thái đặt lịch và chưa có phiếu dịch vụ
router.get('/customers/schedule', EmployBusinessController.showCustomerSchedule);

// Hiển thị trang danh sách khách hàng trạng thái tiềm năng
router.get('/customers/potential', EmployBusinessController.showCustomerPotential);

// Hiển thị trang danh sách khách hàng trạng thái tạo mới
router.get('/customers/new', EmployBusinessController.showCustomerNew);

// Hiển thị trang thông tin tài khoản người dùng
router.get('/profile', EmployBusinessController.showProfile);

// Hiển thị trang tổng quan
router.get('/', EmployBusinessController.showDashboard);
/* Business Employ End*/

module.exports = router;
