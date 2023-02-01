const express = require('express');
const router = express.Router();
const printController = require('../controllers/printController');


router.get('/getPrintByVendor', printController.getPrintByVendor);
router.post('/postPrintData', printController.postPrintData);
router.post('/updateStatus', printController.updateStatus);
router.get('/getByCustomer/:id', printController.getDataByCustomer);



module.exports = router;