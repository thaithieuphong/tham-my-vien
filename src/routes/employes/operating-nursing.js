const express = require('express');
const router = express.Router();
const NursingController = require('../../app/controllers/operating-controller/NursingOperationRoomController');
const validateUpload = require('../../middleware/validateUpload');
const uploadGoogleDriveBefore = require('../../middleware/uploadGoogleDriveBefore');
const uploadGoogleDriveAfter = require('../../middleware/uploadGoogleDriveAfter');

const authJwt = require("../../middleware/authJwt");

//Employ


router.get('/', [authJwt.verifyToken, authJwt.isNursing], NursingController.showDashboard)


router.patch('/service-note/:id', [authJwt.verifyToken, authJwt.isNursing], NursingController.updateServiceNote)
router.patch('/re-examination/:id', [authJwt.verifyToken, authJwt.isNursing], NursingController.updateReExamination)

// , uploadGoogleDriveAfter.uploadDriveAfter
// router.post('/after/:id',[authJwt.verifyToken, authJwt.isNursing, validateUploadImage.afterUploadGoogleDrive], NursingController.uploadAfter)
// , uploadGoogleDriveBefore.uploadDriveBefore
// router.post('/before/:id',[authJwt.verifyToken, authJwt.isNursing, validateUploadImage.beforeUploadImg, validateUploadImage.beforeUploadVideo], NursingController.uploadBefore)
router.get('/service-note', [authJwt.verifyToken, authJwt.isNursing], NursingController.showServiceNote);
router.get('/re-examination', [authJwt.verifyToken, authJwt.isNursing], NursingController.showReExamination);




router.post('/service-note/before/:id',[authJwt.verifyToken, authJwt.isNursing, validateUpload.beforeUpload], NursingController.uploadBefore)
router.post('/service-note/after/:id',[authJwt.verifyToken, authJwt.isNursing, validateUpload.afterUpload], NursingController.uploadAfter)
router.post('/re-examination/reexam/:id',[authJwt.verifyToken, authJwt.isNursing, validateUpload.reExaminationUpload], NursingController.uploadReExam)



module.exports = router;