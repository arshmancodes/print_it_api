const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();



router.get('/getAll', userController.getAll);
router.post('/postUser', userController.postUser);
router.post('/loginUser', userController.loginUser);
router.post('/updateBalance', userController.updateBalance);


module.exports = router;


