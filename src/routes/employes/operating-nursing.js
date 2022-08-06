const express = require('express');
const router = express.Router();
const NursingController = require('../../app/controllers/operating-controller/NursingOperationRoomController');
const validateUploadImage = require('../../middleware/validateUploadImage');
const uploadGoogleDriveBefore = require('../../middleware/uploadGoogleDriveBefore');
const uploadGoogleDriveAfter = require('../../middleware/uploadGoogleDriveAfter');

const authJwt = require("../../middleware/authJwt");

//Employ

router.patch('/service-note/:id', [authJwt.verifyToken, authJwt.isNursing], NursingController.updateServiceNote)
// , uploadGoogleDriveAfter.uploadDriveAfter
router.post('/after/:id',[authJwt.verifyToken, authJwt.isNursing, validateUploadImage.afterUploadGoogleDrive], NursingController.uploadAfter)
// , uploadGoogleDriveBefore.uploadDriveBefore
router.post('/before/:id',[authJwt.verifyToken, authJwt.isNursing, validateUploadImage.beforeUploadImg, validateUploadImage.beforeUploadVideo], NursingController.uploadBefore)
router.get('/', [authJwt.verifyToken, authJwt.isNursing], NursingController.showServiceNote);

module.exports = router;