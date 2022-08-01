const express = require('express');
const router = express.Router();
const HRController = require('../../app/controllers/human-resource-controller/EmployHRController');
const validateUploadImage = require('../../middleware/validateUploadImage');


//Employ
router.put("/users", HRController.editUser);

router.post("/users", HRController.createUser);

router.get("/users", HRController.showUser);


module.exports = router;