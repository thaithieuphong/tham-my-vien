const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');
const RootController = require('../app/controllers/RootController');
const verifyRegister = require('../middleware/VerifyRegister');
const authJwt = require("../middleware/authJwt");
const validateUploadImage = require('../middleware/validateUpload');
// const session = require('express-session');
// const flash = require('connect-flash');

/* -----------------------------------------Quản lý Operating-room Start-------------------------------------------------- */


// [GET] Root Operating-room UI
router.get('/operating-room', RootController.getRootOperatingRoomDashboard);

/* -----------------------------------------Quản lý Operating-room End-------------------------------------------------- */


/* -----------------------------------------Quản lý Reception Start-------------------------------------------------- */

// [GET] Root Reception UI
router.get('/reception', RootController.getRootReceptionDashboard);

/* -----------------------------------------Quản lý Reception End-------------------------------------------------- */


/* -----------------------------------------Quản lý Business Start-------------------------------------------------- */

// [GET] Root Business UI
router.get('/business', RootController.getRootBussinessDashboard);

/* -----------------------------------------Quản lý Business End-------------------------------------------------- */


/* -----------------------------------------Quản lý Marketing Start-------------------------------------------------- */

// [GET] Root Marketing UI
router.get('/marketing', RootController.getRootMarketingDashboard);

/* -----------------------------------------Quản lý Marketing End-------------------------------------------------- */




/* -----------------------------------------Quản lý User Start-------------------------------------------------- */

// [GET] Root User UI


// [GET] Root User UI
router.get('/user', RootController.getRootUserDashboard);

// [POST] Root Create User UI
router.post('/user', validateUploadImage.uploadSingleUser, RootController.postRootUserDashboard);

// [PUT] Root User UI
router.put('/user/:id', validateUploadImage.uploadSingleUser, RootController.putRootUser)

// [DELETE] Root User UI
// router.delete('/user/:id', RootController.deleteRootUserDashboard);

/* -----------------------------------------Quản lý User End-------------------------------------------------- */



/* -----------------------------------------Quản lý Account Start-------------------------------------------------- */


// [GET] Root Account UI
router.post('/account', [verifyRegister.checkUsernameOrEmail, verifyRegister.checkRole], RootController.postRootAccountDashboard);

// [GET] Root Account UI
router.get('/account', RootController.getRootAccountDashboard);

/* -----------------------------------------Quản lý Account End-------------------------------------------------- */



/* -----------------------------------------Quản lý Customer Start-------------------------------------------------- */

// [GET] Root Customer UI
router.get('/customer', RootController.getRootCustomerDashboard);

/* -----------------------------------------Quản lý Customer End-------------------------------------------------- */



/* -----------------------------------------Quản lý Department Start-------------------------------------------------- */


// [GET] Root Department UI
router.get('/department', RootController.getRootDepartmentDashboard);

/* -----------------------------------------Quản lý Department End-------------------------------------------------- */



/* -----------------------------------------Quản lý Role Start-------------------------------------------------- */

// [GET] Root Role UI
router.get('/roles', RootController.getRootRoleDashboard);

// [POST] Root Role UI
router.post('/roles', RootController.createRootRoleDashboard);

/* -----------------------------------------Quản lý Role End-------------------------------------------------- */



/* -----------------------------------------Quản lý Service-note Start-------------------------------------------------- */

// [GET] Root Service Note UI
router.get('/service-note', RootController.getRootServiceNoteDashboard);

/* -----------------------------------------Quản lý Service-note End-------------------------------------------------- */



/* -----------------------------------------Quản lý Service Start-------------------------------------------------- */


// [GET] Root Service UI
router.get('/service', RootController.getRootServiceDashboard);

/* -----------------------------------------Quản lý Service End-------------------------------------------------- */


/* -----------------------------------------Quản lý Status Start-------------------------------------------------- */

// [GET] Root Status UI
router.get('/status', RootController.getRootStatusDashboard);

/* -----------------------------------------Quản lý Status End-------------------------------------------------- */

// [GET] Root Dashboard UI
router.get('/dashboard', RootController.getRootDashboard);
router.post('/', AuthController.postLogin);
router.get('/',  AuthController.getRootLogin);


module.exports = router;