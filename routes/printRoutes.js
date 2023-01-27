const express = require('express');
const router = express.Router();
const printController = require('../controllers/printController');


router.get('/getPrintByVendor', printController.getPrintByVendor);
router.post('/postPrintData', printController.postPrintData);
router.post('/updateStatus', printController.updateStatus);



module.exports = router;