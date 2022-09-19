const express = require('express');
const EmployCustomerCareController = require('../../app/controllers/customer-care-controller/EmployCustomerCareController');
const router = express.Router();
const AuthController = require('../../app/controllers/AuthController');

/* Business Employ Start*/
router.post('/change-pass', AuthController.changePassword);

router.get('/re-exam/:id/detail', EmployCustomerCareController.showReExaminations);
router.get('/customers', EmployCustomerCareController.showCustomer);
router.get('/profile', EmployCustomerCareController.showProfile);
router.get('/', EmployCustomerCareController.showDashboard);
/* Business Employ End*/

module.exports = router;
