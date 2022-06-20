const express = require('express');
const router = express.Router();
const RootController = require('../app/controllers/RootController');

// [GET] Root Operating-room UI
router.get('/operating-room', RootController.getRootOperatingRoomDashboard);

// [GET] Root Reception UI
router.get('/reception', RootController.getRootReceptionDashboard);

// [GET] Root Business UI
router.get('/business', RootController.getRootBussinessDashboard);

// [GET] Root Marketing UI
router.get('/marketing', RootController.getRootMarketingDashboard);

// [GET] Root User UI
router.get('/user', RootController.getRootUserDashboard);



// [GET] Root Account UI
router.post('/account', RootController.postRootAccountDashboard);

// [GET] Root Account UI
router.get('/account', RootController.getRootAccountDashboard);

// [GET] Root Customer UI
router.get('/customer', RootController.getRootCustomerDashboard);

// [GET] Root Department UI
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
router.get('/', RootController.getRootDashboard);

module.exports = router;