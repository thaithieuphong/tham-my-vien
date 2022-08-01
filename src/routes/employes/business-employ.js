const express = require('express');
const EmployBusinessController = require('../../app/controllers/business-controller/EmployBusinessController');
const router = express.Router();
const validateUploadImage = require('../../middleware/validateUploadImage');

/* Business Employ Start*/
router.patch('/customers/:id/comment', EmployBusinessController.createComment);
router.put('/customers/:id', validateUploadImage.uploadSingleCustomer, EmployBusinessController.editCustomer);

router.post('/customers/:id/service-note', EmployBusinessController.createServiceNote);
router.post('/customers', validateUploadImage.uploadSingleCustomer, EmployBusinessController.createCustomer);

router.post('/customers/:id/detail', validateUploadImage.counselorUploadGoogleDrive, EmployBusinessController.uploadToDrive)
router.get('/customers/:id/detail', EmployBusinessController.showCustomerDetail)
router.get('/service-note', EmployBusinessController.showServiceNote);
router.get('/customers', EmployBusinessController.showCustomer);
router.get('/', EmployBusinessController.showCustomer);
// router.get('/', EmployBusinessController.show404);
/* Business Employ End*/

module.exports = router;
