const express = require('express');
const router = express.Router();
const printController = require('../controllers/printController');



/**
 * @swagger
 * /print/getPrintByVendor:
 *  get: 
 *      summary: This API is used to GET the Prints by vendor data to the server
 *      description: The Request is performed by using this API.
 *      responses:
 *          200:
 *              description: The print data for this vendor is displayed
 */
router.get('/getPrintByVendor', printController.getPrintByVendor);
/**
 * @swagger
 * /print/postPrintData:
 *  post: 
 *      summary: This API is used to POST the Prints data to the server
 *      description: The Request is performed by using this API.
 *      responses:
 *          200:
 *              description:"Posted Successfully",
                "success": true
 */
router.post('/postPrintData', printController.postPrintData);

//router.post('/updateStatus', printController.updateStatus);


/**
 * @swagger
 * /print/getByCustomer/id:
 *  get: 
 *      summary: This API is used to GET the Prints data for the server using Customer id
 *      description: The Request is performed by using this API.
 *      responses:
 *          200:
 *              description:"Retrieved Successfully",
 */
router.get('/getByCustomer/:id', printController.getDataByCustomer);



module.exports = router;