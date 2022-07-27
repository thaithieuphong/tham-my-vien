const express = require('express');
const router = express.Router();
const ManagerHRController = require('../../app/controllers/human-resource-controller/ManagerHRController');
const validateUploadImage = require('../../middleware/validateUploadImage');

/* Business Manager Start*/
// router.patch('/customers/:id', ManagerHRController.createComment);
// router.patch('/service-note/:id', ManagerHRController.deleteServiceNote);

// router.post('/customers/:id/service-note', ManagerHRController.createServiceNote);

// router.get('/customers/:id/detail', ManagerHRController.showCustomerDetail)
// router.get('/service-note', ManagerHRController.showServiceNote);
router.delete('/users/:id/delete', ManagerHRController.deleteUser);
router.put('/users/:id/edit', validateUploadImage.uploadSingleUserEdit, ManagerHRController.editUser);
router.post('/users', validateUploadImage.uploadSingleUser, ManagerHRController.createUser);
router.get('/users', ManagerHRController.showUsers);
router.get('/', ManagerHRController.showDashboard);
// router.get('/', ManagerBusinessController.show404);
/* Business Manager End*/

module.exports = router;