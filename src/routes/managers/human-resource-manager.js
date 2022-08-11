const express = require('express');
const router = express.Router();
const ManagerHRController = require('../../app/controllers/human-resource-controller/ManagerHRController');
const validateUpload = require('../../middleware/validateUpload');
const authJwt = require('../../middleware/authJwt');

/* Business Manager Start*/
router.delete('/users/:id/delete', ManagerHRController.deleteUser);
router.put('/users/:id/edit', validateUpload.uploadSingleUserEdit, ManagerHRController.editUser);
router.post('/users', ManagerHRController.createUser);
router.post('/change-pass', ManagerHRController.changePassword)

router.get('/users', ManagerHRController.showUsers);
router.get('/user/:id/detail', ManagerHRController.detailUser);
router.get('/profile', ManagerHRController.showProfile);
router.get('/', ManagerHRController.showDashboard);
/* Business Manager End*/

module.exports = router;