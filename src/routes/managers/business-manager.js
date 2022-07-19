const express = require('express');
const ManagerBusinessController = require('../../app/controllers/business-controller/ManagerBusinessController');
const router = express.Router();
const validateUploadImage = require('../../middleware/validateUploadImage');


/* Business Manager Start*/
router.delete('/service-note/:id', ManagerBusinessController.deleteServiceNote);
router.patch('/customers/:id/comment', ManagerBusinessController.createComment);
router.put('/customers/:id/edit', validateUploadImage.upload, ManagerBusinessController.editCustomer);

router.post('/customers/:id/service-note', ManagerBusinessController.createServiceNote);
router.post('/customers', validateUploadImage.upload, ManagerBusinessController.createCustomer);

router.get('/customers/:id/detail', ManagerBusinessController.showCustomerDetail)
router.get('/service-note', ManagerBusinessController.showServiceNote);
router.get('/customers', ManagerBusinessController.showCustomer);
router.get('/', ManagerBusinessController.showDashboard);
// router.get('/', ManagerBusinessController.show404);
/* Business Manager End*/


module.exports = router;