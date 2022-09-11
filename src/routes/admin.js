const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');
const AdminController = require('../app/controllers/AdminController');
const authJwt = require('../middleware/authJwt');

//CUSTOMER
router.delete('/customer/:id', [authJwt.verifyToken, authJwt.isAdmin], AdminController.deleteCustomer);
router.get('/customer', [authJwt.verifyToken, authJwt.isAdmin], AdminController.getAdminCustomer);
router.get('/customer/:id/detail', [authJwt.verifyToken, authJwt.isAdmin], AdminController.getAdminCustomerDetail);
//END CUSTOMER


//RE-EXAMINATION
router.delete('/re-examination/:id', [authJwt.verifyToken, authJwt.isAdmin], AdminController.deleteReExamination);
router.get('/re-examination/:id', [authJwt.verifyToken, authJwt.isAdmin], AdminController.getAdminReExaminationDetail);
router.get('/re-examination', [authJwt.verifyToken, authJwt.isAdmin], AdminController.getAdminReExamination);
// router.get('/:id/accountedit', AdminController.editAccount)
//END RE-EXAMINATION

//SERVICE NOTE
// router.post('/service-note', AdminController.creatAdminServiceNote)
router.delete('/service-note/:id', [authJwt.verifyToken, authJwt.isAdmin], AdminController.deleteServiceNote);
router.get('/service-note/:id', [authJwt.verifyToken, authJwt.isAdmin], AdminController.getAdminServiceNoteDetail);
router.get('/service-note', [authJwt.verifyToken, authJwt.isAdmin], AdminController.getAdminServiceNote);
//END SERVICE NOTE
router.get('/profile', [authJwt.verifyToken, authJwt.isAdmin], AdminController.getAdminProfile);

router.post('/logout', AuthController.rootLogout);
router.post('/', AuthController.postAdminLogin);
router.get('/', AuthController.getAdminLogin);

module.exports = router;