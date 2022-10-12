const express = require('express');
const router = express.Router();
const NursingController = require('../../app/controllers/operating-controller/NursingOperationRoomController');
const validateUpload = require('../../middleware/validateUpload');
const AuthController = require("../../app/controllers/AuthController");

router.delete('/:id/schedule', NursingController.deleteServiceNote);
router.patch('/service-note/:id', NursingController.updateServiceNote);
router.patch('/re-examination/:id', NursingController.updateReExamination);
router.post('/service-note/counselor/:id', validateUpload.counselorUpload, NursingController.uploadCounselor);
router.post('/service-note/before/:id', validateUpload.beforeUpload, NursingController.uploadBefore);
router.post('/service-note/after/:id', validateUpload.afterUpload, NursingController.uploadAfter);
router.post('/re-examination/reexam/:id', validateUpload.reExaminationUpload, NursingController.uploadReExam);
router.post('/re-examination/re-exam', NursingController.createReExam);
router.post('/change-pass', AuthController.changePassword);

router.get('/service-note', NursingController.showServiceNote);
router.get('/re-examination', NursingController.showReExamination);
router.patch('/customers/:id/comment', NursingController.createComment);
router.put('/customers/:id', validateUpload.uploadSingleCustomer, NursingController.editCustomer);
router.post('/customers/:id/service-note', validateUpload.counselorUpload, NursingController.createServiceNote);
router.post('/customers', validateUpload.uploadSingleCustomer, NursingController.createCustomer);
router.get('/customers/:id/detail', NursingController.showCustomerDetail);
router.get('/customers', NursingController.showCustomers);
router.get('/profile', NursingController.showProfile);
router.patch('/schedule/:id/restore', NursingController.restoreSchedule);
router.get('/storage', NursingController.showStorage);
router.get('/schedule/:id/create', NursingController.showCreateCusInfor);
router.get('/schedule/:id/detail', NursingController.showScheduleDetail);
router.get('/', NursingController.showSchedule)

module.exports = router;