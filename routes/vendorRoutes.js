const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');


router.get('/getAll', vendorController.getAll);
router.post('/postUser', vendorController.postUser);
router.post('/loginUser', vendorController.loginUser);
router.post('/updateBalance', vendorController.updateBalance);


module.exports = router;