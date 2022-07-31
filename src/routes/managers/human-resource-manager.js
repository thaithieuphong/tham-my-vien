const express = require('express');
const router = express.Router();
const ManagerHRController = require('../../app/controllers/human-resource-controller/ManagerHRController');
const validateUploadImage = require('../../middleware/validateUploadImage');
const cloudinaryUpload = require('../../middleware/cloudinaryUpload');
const uploadGoogleDrive = require('../../middleware/uploadGoogleDrive');

/* Business Manager Start*/
router.delete('/users/:id/delete', ManagerHRController.deleteUser);
router.put('/users/:id/edit', validateUploadImage.uploadSingleUserEdit, ManagerHRController.editUser);
router.post('/users', validateUploadImage.uploadSingleUser, ManagerHRController.createUser);
router.get('/users', ManagerHRController.showUsers);
router.get('/user/:id/detail', ManagerHRController.detailUser);
router.get('/', ManagerHRController.showDashboard);
/* Business Manager End*/

module.exports = router;