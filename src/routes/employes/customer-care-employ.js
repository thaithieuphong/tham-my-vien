const express = require('express');
const EmployCustomerCareController = require('../../app/controllers/customer-care-controller/EmployCustomerCareController');
const router = express.Router();
const AuthController = require('../../app/controllers/AuthController');

/* Business Employ Start*/
router.post('/change-pass', AuthController.changePassword);
router.patch('/customers/service-note/:id/done', EmployCustomerCareController.updateServiceNoteDone);
router.patch('/re-exam/:id/done', EmployCustomerCareController.updateReExamDone);
router.patch('/re-exam/:id/edit', EmployCustomerCareController.editReExam);
router.post('/customers/:id/create-re-examination', EmployCustomerCareController.createReExam);
router.get('/re-exam/:id/detail', EmployCustomerCareController.showReExaminationDetail);
router.get('/re-exam', EmployCustomerCareController.showReExamination);
router.get('/customers/:id/detail', EmployCustomerCareController.showCustomerDetail);
router.get('/storage/:id/detail', EmployCustomerCareController.showCustomerStorageDetail);
router.get('/storage', EmployCustomerCareController.showStorage);
router.get('/customers', EmployCustomerCareController.showCustomer);
router.get('/profile', EmployCustomerCareController.showProfile);
router.get('/', EmployCustomerCareController.showDashboard);
/* Business Employ End*/

module.exports = router;
