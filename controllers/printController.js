const db = require('../utils/database');
const multer = require('multer');
const dotenv = require('dotenv');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    }
    , filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
}
);
const upload = multer({
    storage: storage
}).single("printFile");

dotenv.config();
const base_url = process.env.BASE_URL


exports.getPrintByVendor = (req, res) => {
    db.execute("SELECT * from print_requests where vendor_id=?", [req.body.vendor_id]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "The print data for this vendor is displayed",
            data : rows[0]
        })
    })
}

exports.postPrintData = async (req, res) => {
    upload(req, res, (err) => {
        if(err)
        {
            res.status(400).send("Something went wrong!")
        }
        else
        {
            db.execute("INSERT INTO print_requests(customer_id, customer_name, noOfCopies, size, color, file, status, vendor_id, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.body.customer_id, req.body.customer_name, req.body.noOfCopies, req.body.size, req.body.color, base_url+req.file.path, "pending", req.body.vendor_id, req.body.note]).then(([rows, fieldData]) => {
                res.status(200).json({
                    message: "Posted Successfully",
                    success: true
                })
            }).catch(e => {
                res.status(400).json({
                    error: e,
                    success: false
                })
            })
        }
    })
}

exports.updateStatus = (req, res) => {
    if(req.body.status == "Accepted")
    {
        db.execute("SELECT * FROM print_requests where req_id=?", [req.body.req_id]).then(([rows, fieldData]) => {
            db.execute("INSERT INTO print_records(user_id, vendor_id, feedback, timePosted) VALUES (?, ?, ?, ?)", [rows[0].user_id, rows[0].vendor_id, "Good Staff", Date.now().toString()]).then(([nested_rows, nested_fieldData]) => {
                
            })
        })
    }
    db.execute("UPDATE print_requests SET status=? WHERE req_id=?", [req.body.status, req.body.req_id]).then(([rows, fieldData]) => {
        res.status(200).json({
            message: "Updated Successfully",
            success: true
        })
    }).catch(e => {
        res.status(400).json({
            message : "An Error Occured",
            success: false,
            error: e
        })
    })
}