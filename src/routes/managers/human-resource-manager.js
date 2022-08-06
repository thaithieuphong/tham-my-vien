const express = require('express');
const router = express.Router();
const ManagerHRController = require('../../app/controllers/human-resource-controller/ManagerHRController');
const validateUploadImage = require('../../middleware/validateUploadImage');
const cloudinaryUpload = require('../../middleware/cloudinaryUpload');
const uploadGoogleDrive = require('../../middleware/uploadGoogleDriveCounselor');
const authJwt = require('../../middleware/authJwt');


/* Business Manager Start*/
router.delete('/users/:id/delete',[authJwt.verifyToken, authJwt.isHRManager], ManagerHRController.deleteUser);
router.put('/users/:id/edit',[authJwt.verifyToken, authJwt.isHRManager, validateUploadImage.uploadSingleUserEdit], ManagerHRController.editUser);
router.post('/users',[authJwt.verifyToken, authJwt.isHRManager, validateUploadImage.uploadSingleUser], ManagerHRController.createUser);
router.get('/users',[authJwt.verifyToken, authJwt.isHRManager], ManagerHRController.showUsers);
router.get('/user/:id/detail', ManagerHRController.detailUser);
router.get('/',[authJwt.verifyToken, authJwt.isHRManager], ManagerHRController.showDashboard);
/* Business Manager End*/

module.exports = router;