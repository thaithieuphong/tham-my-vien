const express = require('express');
const router = express.Router();
const NursingController = require('../../app/controllers/operating-controller/NursingOperationRoomController');
const validateUpload = require('../../middleware/validateUpload');
const authJwt = require("../../middleware/authJwt");

router.patch('/service-note/:id', NursingController.updateServiceNote)
router.patch('/re-examination/:id', NursingController.updateReExamination)
router.post('/service-note/before/:id', validateUpload.beforeUpload, NursingController.uploadBefore)
router.post('/service-note/after/:id', validateUpload.afterUpload, NursingController.uploadAfter)
router.post('/re-examination/reexam/:id', validateUpload.reExaminationUpload, NursingController.uploadReExam)
router.get('/service-note', NursingController.showServiceNote);
router.get('/re-examination', NursingController.showReExamination);
router.get('/', NursingController.showDashboard)

module.exports = router;