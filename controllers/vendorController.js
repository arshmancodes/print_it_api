const db = require('../utils/database');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');



exports.getAll = (req, res) => {
    db.execute("SELECT * from vendor").then(([rows, fieldData]) => {
        res.status(200).json({
            messaage: "The query has been executed succesfully",
            success: true,
            data: rows[0]
        })
    }).catch(e => {
        res.status(400).json({
            message: "There was an error executing the API ",
            error: e,
            success: false
        })
    })
}

exports.postUser = (req, res) => {
    const salt = genSaltSync(10);
    password = hashSync(req.body.password, salt);
    db.execute("SELECT * from vendor where email=?", [req.body.email]).then(([rows, fieldData]) => {
        if(rows.length > 0) 
        {
            res.status(200).json({
                message: "Email Already Exists",
                success: false
            })
        }
        else
        {
            db.execute("INSERT INTO vendor(email, password, mobile_number, longitude, latitude, wallet_balance, secret) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.body.email, password, req.body.mobile_number, req.body.longitude, req.body.latitude, req.body.wallet_balance, req.body.secret]).then(([rows, fieldData]) => {
                res.status(200).json({
                    message: "Posted Successfully",
                    success: true
                })
            }).catch(e => {
                res.status(200).json({
                    message : "Error Encountered",
                    error: e,
                    success: false
                })
            })
        }
    }).catch(e => {
        res.status(200).json({
            message: "An Error occured",
            error: e,
            success: false
        })
    })
}


exports.loginUser = (req, res) => {
    db.execute("SELECT * from vendor where email=?", [req.body.email]).then(([rows, fieldData]) => {
        if(rows.length > 0) 
        {
            const validPassword = compareSync(req.body.password, rows[0].password);
            if(validPassword)
            {
                res.status(200).json({
                    message : 'Vendor logged in Successfully',
                    success: true,
                    data: rows[0],
                    
                })
            }
            else
            {
                res.status(200).json({
                    success: false,
                    message: "Vendor Login failed!, Invalid Username or Password",
                })
            }
        }
        else
        {
            res.status(200).json({
                success: false,
                message: "User not Found"
            })
        }
    })
}




