const express = require('express');
const router = express.Router();
const MarketingController = require('../../app/controllers/marketing-controller/EmployMarketingController');
const validateUploadImage = require('../../middleware/validateUpload');
const AuthController = require('../../app/controllers/AuthController');

//Employ
router.put('/customers/:id', validateUploadImage.uploadSingleCustomer, MarketingController.editCustomer);
router.post('/customers', validateUploadImage.uploadSingleCustomer, MarketingController.createCustomer);
router.post('/change-pass', AuthController.changePassword);


router.get('/customers/:id/detail', MarketingController.showCustomerDetail);
router.get('/customers', MarketingController.showCustomer);
router.get('/profile', MarketingController.showProfile);
router.get('/', MarketingController.showDashboard);


module.exports = router;