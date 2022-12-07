const express = require('express');
const router = express.Router();
const NursingController = require('../../app/controllers/operating-controller/NursingOperationRoomController');
const validateUpload = require('../../middleware/validateUpload');
const AuthController = require("../../app/controllers/AuthController");

// router.post('/re-examination/re-exam', NursingController.createReExam);
router.post('/change-pass', AuthController.changePassword);

router.patch('/customers/:id/comment', NursingController.createComment);
router.put('/customers/:id', validateUpload.uploadSingleCustomer, NursingController.editCustomer);
// router.post('/customers/:id/service-note', validateUpload.counselorUpload, NursingController.createServiceNote);
router.post('/customers', validateUpload.uploadSingleCustomer, NursingController.createCustomer);
router.get('/customers/:id/detail', NursingController.showCustomerDetail);
router.get('/customers', NursingController.showCustomers);
router.get('/profile', NursingController.showProfile);
router.patch('/schedule/:id/restore', NursingController.restoreSchedule);
router.get('/storage-cus-info-done', NursingController.showStorageCusInfoDone);
router.delete('/re-examination/:id/delete', NursingController.deleteReExam);
router.patch('/re-examination/:id/done', NursingController.updateReExamDone);
router.put('/re-examination/:id/update', validateUpload.reExaminationUpload, NursingController.uploadReExam);
router.get('/re-examination/:id', NursingController.showReExaminationUpdate);
router.get('/re-examination/:id/detail', NursingController.showReExaminationDetail);
router.get('/re-examination', NursingController.showReExamination);
router.post('/discharge-from-hospital/:id/create-re-examination', NursingController.createReExam);
router.get('/discharge-from-hospital', NursingController.showStorageCusInfo);
router.patch('/service-note/:id/done', NursingController.updateServiceNoteDone);
router.patch('/service-note/:id/discharge-from-hospital', NursingController.updateServiceNoteDischargeFromHospital);
router.get('/service-note/:id/detail', NursingController.showServiceNoteDetail);
router.get('/service-note', NursingController.showServiceNote);
router.post('/customer-information/:id/operating-counselor', validateUpload.counselorUpload, NursingController.uploadCounselor);
router.post('/customer-information/:id/operating-before', validateUpload.beforeUpload, NursingController.uploadBefore);
router.post('/customer-information/:id/operating-in-surgery', validateUpload.inSurgeryUpload, NursingController.uploadInSurgery);
router.post('/customer-information/:id/operating-after', validateUpload.afterUpload, NursingController.uploadAfter);
router.put('/customer-information/:id/service-info', NursingController.updateServiceCusInfor);
router.put('/customer-information/:id/cus-info', NursingController.updateCusInfor);
router.post('/customer-information/:id/create', NursingController.createCusInfor);
router.get('/customer-information/:id', NursingController.showCreateCusInfor);
router.delete('/schedule/:id/delete', NursingController.deleteSchedule);
router.post('/schedule/:id/create', NursingController.createSchedule);
router.get('/schedule/:id/create', NursingController.showCreateSchedule);
router.get('/schedule/:id/detail', NursingController.showScheduleDetail);
router.get('/', NursingController.showSchedule)

module.exports = router;