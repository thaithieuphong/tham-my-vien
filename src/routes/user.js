const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');

router.post('/', UserController.create);
router.get('/', UserController.getUserDashboard);
// router.post('/', managerController.postUserPassword);

module.exports = router;