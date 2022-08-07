const express = require('express');
const router = express.Router();
const NursingController = require('../../app/controllers/operating-controller/NursingOperationRoomController');
const validateUpload = require('../../middleware/validateUpload');
const uploadGoogleDrive = require('../../middleware/uploadGoogleDriveBefore');
const authJwt = require("../../middleware/authJwt");

//Employ
router.patch('/service-note/:id', NursingController.updateServiceNote)


router.post('/before/:id',[authJwt.verifyToken, authJwt.isNursing, validateUpload.beforeUpload], NursingController.uploadBefore)
router.get('/', NursingController.showServiceNote);

module.exports = router;