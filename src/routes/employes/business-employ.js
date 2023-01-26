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

// Yêu cầu tạo phiếu tái khám
router.post('/schedule/exam', EmployBusinessController.createReExam);

// Yêu cầu thay đổi mật khẩu
router.post('/change-pass', AuthController.changePassword);

// Hiển thị trang chi tiết phiếu dịch vụ
router.get('/service-note/:id/detail', EmployBusinessController.showServiceNoteDetail);

// Cập nhật thông tin khách hàng trên phiếu dịch vụ
router.put('/service-note/:id/cus-info', EmployBusinessController.updateCusInfor);

// Tạo phiếu dịch vụ từ trang lịch hẹn tư vấn
router.get('/service-note/:id/update', EmployBusinessController.showServiceNoteUpdate);

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

// Hiển thị trang chi tiết khách hàng ở trạng thái xuất viện
router.get('/customer/:id/discharge-from-hospital-detail', EmployBusinessController.showCustomerDischargeFromHospitalDetail);

// Hiển thị trang sửa thông tin khách hàng
router.get('/customers/:id/edit', EmployBusinessController.showCustomerEdit);

// Hiển thị trang tạo thông tin khách hàng
router.get('/customers/create', EmployBusinessController.showCustomerCreate);

// Hiển thị trang danh sách khách hàng trạng thái hoàn thành phẫu thuật (Cần chỉnh sửa)
router.get('/customers/done', EmployBusinessController.showCustomerDone);

// Hiển thị trang danh sách khách hàng trạng thái xuất viện (Cần chỉnh sửa)
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
