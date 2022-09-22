const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');
const RootController = require('../app/controllers/RootController');
const verifyRegister = require('../middleware/VerifyRegister');
const authJwt = require("../middleware/authJwt");
const validateUploadImage = require('../middleware/validateUpload');

// [GET] Root Operating-room UI
router.get('/operating-room', RootController.getRootOperatingRoomDashboard);


// [GET] Root Reception UI
router.get('/reception', RootController.getRootReceptionDashboard);

// [GET] Root Business UI
router.get('/business', RootController.getRootBussinessDashboard);

// [GET] Root Marketing UI
router.get('/marketing', RootController.getRootMarketingDashboard);

// [GET] Root User UI


// [GET] Root User UI
router.get('/user', [authJwt.verifyToken, authJwt.isRoot], RootController.getRootUserDashboard);

// [GET] Root User UI
router.get('/user/:id/detail', [authJwt.verifyToken, authJwt.isRoot], RootController.detailRootUser);

// [POST] Root Create User UI
router.post('/user', [authJwt.verifyToken, authJwt.isRoot, validateUploadImage.uploadSingleUser], RootController.postRootUserDashboard);

// [PUT] Root User UI
router.put('/user/:id', [authJwt.verifyToken, authJwt.isRoot, validateUploadImage.uploadSingleUser], RootController.putRootUser)

// [DELETE] Root User UI
router.delete('/user/:id', [authJwt.verifyToken, authJwt.isRoot], RootController.deleteRootUser);


// [GET] Root Customer UI
router.get('/customer', RootController.getRootCustomerDashboard);


// [GET] Root Department UI
router.post('/department', RootController.createDepartment);
router.get('/department', RootController.getRootDepartmentDashboard);

// [GET] Root Role UI
router.get('/roles', RootController.getRootRoleDashboard);

// [POST] Root Role UI
router.post('/roles', RootController.createRootRoleDashboard);

// [GET] Root Service Note UI
router.get('/service-note', RootController.getRootServiceNoteDashboard);


// [GET] Root Service UI
router.get('/service', RootController.getRootServiceDashboard);

// [GET] Root Status UI
router.get('/status', RootController.getRootStatusDashboard);

// [GET] Root Dashboard UI
router.get('/dashboard', [authJwt.verifyToken, authJwt.isRoot], RootController.getRootDashboard);

// [GET] Root Profile UI
router.get('/profile', [authJwt.verifyToken, authJwt.isRoot], RootController.getRootProfile);

router.post('/logout', AuthController.rootLogout);
router.post('/', AuthController.postRootLogin);
router.get('/', AuthController.getRootLogin);

module.exports = router;