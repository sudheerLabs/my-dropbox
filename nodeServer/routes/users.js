var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var multer = require('multer');
var fs = require('fs-extra');
var crypto = require('crypto');
var CryptoJS = require('crypto-js');
var AES = require('crypto-js/aes');

var passport = require('passport');
require('./login')(passport);

var kafka = require('./kafka/client');
var g_user;
var newuser;

/*
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
*/

router.post('/doLogin', function(req, res) {
    passport.authenticate('login', function(err, user) {
        console.log("printing the returned response");
        console.log(user);
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }else{
            console.log(user);
            req.session.user = user.value.username;
            g_user = user.value.username;
            console.log(user.value.username);
            console.log(req.session.user);
            console.log("session initilized");
            //return res.status(201).send({username:"test"});
            res.status(201).json(user.value);
        }
        
    })(req, res);
});


router.post('/doSignup', function (req, res, next) {

    passport.authenticate('signup', function(err, user) {
        console.log("printing the returned response");
        console.log(user);
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }else{
            console.log(user);
            req.session.user = user.value.username;
            g_user = user.value.username;
            console.log(user.value.username);
            console.log(req.session.user);
            console.log("session initilized");
            //return res.status(201).send({username:"test"});
            fs.mkdirs('./public/root/'+g_user , function(err){
              if (err) {return console.error(err);}
              console.log("success!");
            });
            signupuser = g_user;
            res.status(201).json(user.value);
        }
        
    })(req, res);
    
});

/*
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
*/



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

    console.log(req.body.path);
    path = req.body.path;

    destPath = "./public" + path.replace(/,/g, '/') + "/" + reqFileName;
    console.log(destPath);
    
    //var destPath='./public/root/' + g_user + '/' + reqFileName ;
    
    fs.move('./public/storage/temp/' + reqFileName , destPath);

    //var storagepath = "'/root/"+g_user+ "/"+reqFileName+"'";

    //res.status(401).send();


    kafka.make_request('files_topic', 'FILE_UPLOAD', {"user" : g_user, "path":path, "filename" : reqFileName}, function(err,file){
        console.log('files uploaded ');
        console.log(file);

        if(err) {
            res.status(500).send();
        }

        if(!file) {
            res.status(401).send();
        }else{
            res.status(201).json(file.value);
        }
    });

    /*
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
        
    }, fetchFile); */
});

    

router.post('/dashboard', requireLogin, function (req, res, next) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
});


router.post('/doLogout', function (req, res, next) {
    console.log(req.session.user);
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(201).json({message: "Signout Successful"});
});

function requireLogin(req, res, next) {
  if (!req.username) {
    res.status(401);
  } else {
    next();
  }
}


router.post('/getFiles', function (req, res, next) {

    console.log("in get files router");
    console.log(g_user);

    console.log(req.body.dir);

    kafka.make_request('files_topic', 'GET_FILES', {"path":req.body.dir}, function(err,files){
        console.log('files retrieved ');
        console.log(files);

        if(err) {
            res.status(500).send();
        }

        if(!files) {
            res.status(401).send();
        }else{
            res.status(201).json(files.value);
        }
    });

    /*var getfiles="select * from user_files where author= '" + g_user + "'";
    
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
    */
    
});


router.post('/toggleStar', function (req, res, next) {

    var reqFileId = parseInt(req.body.fileId);
    console.log(req.body.fileId);

    
    kafka.make_request('files_topic', 'TOGGLE_STAR', {"id":req.body.fileId}, function(err,file){
        console.log('file retrieved ');
        console.log(file);

        if(err) {
            res.status(500).send();
        }

        if(!file) {
            res.status(401).send();
        }else{
            console.log("sending success message");
            res.status(201).json({message: "Update Successful"});
            console.log(res.status);
        }
    });
    
    /*
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
    */
});


router.post('/deleteFile', function (req, res, next) {

    var reqFileId = parseInt(req.body.fileId);
    console.log(req.body.fileId);

    
    kafka.make_request('files_topic', 'DELETE_FILE', {"id":req.body.fileId}, function(err,file){
        console.log('file retrieved ');
        console.log(file);

        if(err) {
            res.status(500).send();
        }

        if(!file) {
            res.status(401).send();
        }else{
            console.log("sending success message");
            res.status(201).json({message: "Update Successful"});
            console.log(res.status);
        }
    });
    
    /*
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
    */
});


router.post('/addFolder', function (req, res, next) {

    var reqFolderName = req.body.folderName;
    console.log(req.body.folderName);
    var user = req.session.username;
    console.log(g_user);
    console.log(reqFolderName);
    console.log(user);
    var path = req.body.path;

    kafka.make_request('files_topic', 'CREATE_FOLDER', {"folder":req.body.folderName, "path" : req.body.path, "user" : g_user}, function(err,folder){
        console.log('folder inserted ');
        console.log(folder);

        if(err) {
            res.status(500).send();
        }

        if(!folder) {
            res.status(401).send();
        }else{
            console.log("sending success message");
            //res.status(201).json({message: "Folder creation Successful"});
            path = "./public" + path.replace(/,/g, '/') + "/" + reqFolderName;
            console.log(path);

            fs.mkdirs(path , function(err){
                if (err) {
                    res.status(401).json({message: "Folder Creation failed"});
                }
                console.log("success!");
                res.status(201).json({folder: folder.value});
            });
        }
    });
});


router.post('/shareFile', function (req, res, next) {

    var requsername = g_user;
    var reqfilepath = req.body.path;
    var reqfilename = req.body.filename;
    var reqUserlist = req.body.userlist;

    console.log(req.session.user);
    

    console.log("this is session user" + requsername);
    console.log("in sharedocument");
    console.log("this is shareuser "+ reqUserlist );
    
    
    kafka.make_request('files_topic', 'SHARE_FILE', {"username":requsername, "path" : reqfilepath, "filename" : reqfilename, "userlist" : reqUserlist }, function(err,results){
        console.log("sending request to kafka ");
        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.code == 201){
                console.log("file shared successfully in db");
                var shareusers = reqUserlist;
                var originpath = './public/' + reqfilepath.replace(/,/g, '/') + reqfilename;
                var destPath = './public/root/' + shareusers + '/' + reqfilename;
                    fs.copy(originpath, destPath, { replace: false }, function(err){
                        if (err) {
                            return console.error(err);
                        }
                        console.log("fs copy is success!");
                    });                
                return res.status(201).json({message: "share successful"});
            }
            else {
                console.log("file share unsuccessful in db");
                return res.status(401).json({message: "share unsuccessful"});
            }
        }
    });             


    /*

    
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

    */
});




module.exports = router;
