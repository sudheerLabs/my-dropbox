var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var multer = require('multer');
var fs = require('fs-extra');
var crypto = require('crypto');
var CryptoJS = require('crypto-js');
var AES = require('crypto-js/aes');

var g_user;
var newuser;

router.post('/doLogin', function (req, res, next) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;

    var getUser="select username, password from users where username='"+reqUsername +"'";
    console.log("Query is:"+getUser);
    
    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else 
        {
            if(results.length > 0){
                var de_Password = CryptoJS.AES.decrypt((results[0].password).toString(), 'CCHIKP2' );
                var password = de_Password.toString(CryptoJS.enc.Utf8);

                if(reqPassword == password){
                    req.session.username = reqUsername;
                    g_user = reqUsername;
                    console.log("session user" + req.session.username);
                    res.status(201).json({message: "Login successful"});
                }
                else {
                    console.log("Invalid Login");
                    res.status(401).json({message: "Invalid Login details"});
                }
            }
            else {
                console.log("Invalid Login");
                res.status(401).json({message: "Login failed"});
            }
        }  
    },getUser);

});

router.post('/doSignup', function (req, res, next) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;

    var getUser="select username from users where username= '"+ reqUsername + "'";
    console.log("Query is:"+getUser);
    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else 
        {
            if(results.length > 0){
                console.log("User already exists");
                res.status(401).json({message: "User already exists"});
            
            }
            else { 
                console.log("connecting to database");
                console.log("encrypting password using aes");
                var en_reqPassword = CryptoJS.AES.encrypt(reqPassword, 'CCHIKP2');
                console.log("this is encrypted password "+ en_reqPassword);
                var createUser = "INSERT INTO users (firstname, lastname, username, password) VALUES (";
                createUser = createUser + "'" + firstName + "', ";
                createUser = createUser + "'" + lastName + "', ";
                createUser = createUser + "'" + reqUsername + "', ";
                createUser = createUser + "'" + en_reqPassword + "')";

                console.log("Creating user : " + createUser);
                mysql.fetchData(function(err,results){
                    if(err){
                        
                        console.log("sql statement failed");
                        throw err;
                        
                    }
                    else {
                        fs.mkdirs('./public/storage/'+reqUsername , function(err){
                              if (err) {return console.error(err);}
                              
                              console.log("success!");
                            });
                        signupuser = reqUsername;
                        console.log("SQL insertion successful");
                        res.status(201).json({message: "SignUp Successful"});
                    }
            
                },createUser);
                
                
            }
        }  
    },getUser);
   
    
});



var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/storage/temp');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({storage:Storage});


router.post('/doFileUpload', upload.single('files'), function (req, res, next) {
    
    var reqFileName = req.file.filename;
    
    var destPath='./public/storage/' + g_user + '/' + reqFileName ;
    
    fs.move('./public/storage/temp/' + reqFileName , destPath);

    var storagepath = "'http://localhost:3001/storage/"+g_user+ "/"+reqFileName+"'";

    
    var fetchFile = "select * from user_files where "
    fetchFile = fetchFile + "author= '" + g_user +"' and filename='" + reqFileName + "'";
    console.log("Query is:"+fetchFile);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else {
            if(results.length > 0){
                console.log("File already exists");          
            }
            else {
                var makeEntry= "Insert into user_files (author, filename, deleted, starred, filepath, rcre_time) values ('"+
                g_user +"', '"+ reqFileName +"', 'N', 'N', "+ storagepath +", NOW())";
            
                mysql.fetchData(function(err,results){
                    if(err){
                        throw err;
                    }
                    else {
                        res.status(201).json({message: "Upload Successful"});
                    }
                },makeEntry);
            }       
        }
        
    }, fetchFile);
});

    

router.post('/dashboard', requireLogin, function (req, res, next) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
});


router.post('/doLogout', function (req, res, next) {
    req.session.reset();
    res.status(201).json({message: "Signout Successful"});
});

function requireLogin(req, res, next) {
  if (!req.username) {
    res.status(401);
  } else {
    next();
  }
}


router.get('/getFiles', function (req, res, next) {

    var getfiles="select * from user_files where author= '" + g_user + "' and deleted = false ";
    
     mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else 
        {
            if(results.length > 0){
                var jsonString = JSON.stringify(results);
                var jsonParse = JSON.parse(jsonString);
                res.status(201).json(results);
            }
            else {                  
                res.status(401).json({message: "No files uploaded by you"});
            }
        }  
    },getfiles);
    
});


router.post('/toggleStar', function (req, res, next) {

    var reqFileId = parseInt(req.body.fileId);
    console.log(req.body.fileId);
    
    var updateFile="UPDATE user_files "
    updateFile= updateFile + "SET starred = (CASE starred WHEN 'N' THEN 'Y' ELSE 'N' END) "
    updateFile= updateFile + "WHERE fileId = "+ reqFileId;
    console.log("Query is:"+updateFile);

    mysql.fetchData(function(err,results){
        console.log(results);
        if(err){
            throw err;
        }
        else 
        {
            if(err){
                console.log("Op failed");
                res.status(401).json({message: "Not starred"});
            
            }
            else {
                console.log("update success");
                res.status(201).json({message: "Update Successful"});
            }
        }  
    },updateFile); 
});


router.post('/deleteFile', function (req, res, next) {

    var reqFileId = parseInt(req.body.fileId);
    console.log(req.body.fileId);
    
    var updateFile="UPDATE user_files "
    updateFile= updateFile + "SET deleted = 'Y'"
    updateFile= updateFile + "WHERE fileId = "+ reqFileId;
    console.log("Query is:"+updateFile);

    mysql.fetchData(function(err,results){
        console.log(results);
        if(err){
            throw err;
        }
        else 
        {
            if(err){
                console.log("Op failed");
                res.status(401).json({message: "Not deleted"});
            
            }
            else {
                console.log("update success");
                res.status(201).json({message: "Delete Successful"});
            }
        }  
    },updateFile); 
});

module.exports = router;
