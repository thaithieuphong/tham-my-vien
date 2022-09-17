const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');
const AssistantController = require('../app/controllers/AssistantController');
const authJwt = require('../middleware/authJwt');

//CUSTOMER
router.delete('/customer/:id', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.deleteCustomer);
router.get('/customer', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.getAssistantCustomer);
router.get('/customer/:id/detail', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.getAssistantCustomerDetail);
//END CUSTOMER


//RE-EXAMINATION
router.delete('/re-examination/:id', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.deleteReExamination);
router.patch('/reexam/:id', AssistantController.pushOperationToReexam);
router.get('/re-examination/:id', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.getAssistantReExaminationDetail);
router.get('/re-examination', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.getAssistantReExamination);
//END RE-EXAMINATION

//SERVICE NOTE
// router.post('/service-note', AdminController.creatAdminServiceNote)
router.delete('/service-note/:id', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.deleteServiceNote);
router.patch('/service-note/:id', AssistantController.pushPerformer);
router.get('/service-note/:id', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.getAssistantServiceNoteDetail);
router.get('/service-note', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.getAssistantServiceNote);
//END SERVICE NOTE


router.get('/profile', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.getAssistantProfile);
router.get('/coordinator-re-examination', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.getAssistantCoordinatorReExamination);
router.delete('/:id/schedule', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.deleteAssistantCoordinatorServiceNote);
router.get('/', [authJwt.verifyToken, authJwt.isAssistant], AssistantController.getAssistantCoordinatorServiceNote);

module.exports = router;