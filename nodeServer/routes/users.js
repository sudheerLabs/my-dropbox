var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

router.post('/doLogin', function (req, res, next) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;

    var getUser="select username, firstname, lastname, DATE_FORMAT(dateofBirth, '%m-%d-%Y') as dateofBirth, gender from users where username='"+reqUsername+"' and password='" + reqPassword +"'";
    console.log("Query is:"+getUser);
    
    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else 
        {
            if(results.length > 0){
                console.log("valid Login" + results);
                res.status(201).json({data: results})  
            }
            else {    
                console.log("Invalid Login");
                res.status(401).json({message: "Login failed"});
            }
        }  
    },getUser);

});

module.exports = router;
