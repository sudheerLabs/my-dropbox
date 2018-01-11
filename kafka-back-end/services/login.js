var mongo = require("./mongo");
var pool = require("./mongopool");
var mongoURL = "mongodb://localhost:27017/dropbox";
var crypto = require('crypto');
var CryptoJS = require('crypto-js');
var AES = require('crypto-js/aes');
var bcrypt = require('bcrypt');

function handle_request(msg, action, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    var conn = pool.getConnection();
    console.log('Connected to mongo at: ' + mongoURL);
    console.log(conn);
    var coll = mongo.collection(conn, 'users');

    
    //mongo.connect(mongoURL, function(){
    //    console.log('Connected to mongo at: ' + mongoURL);
    //    var coll = mongo.collection('users');

        if(action == "USER_SIGNUP"){
            coll.findOne({username: msg.username}, function(err, user){
                if(err){
                    res.code = 401;
                    res.value = error;
                    callback(null, res);
                    //throw err;
                }
                else {
                    if(user != null){
                        //return res.status(401).json({message:"User already exists"});
                        res.code = 401;
                        res.value = "User already exists";
                        callback(null,res);
                    }
                    else{

                        //var en_reqPassword = CryptoJS.AES.encrypt(msg.password, 'CCHIKP2');
                        var hashPassword = bcrypt.hashSync(msg.password, 8);
                        console.log("this is encrypted password "+ en_reqPassword);
                        coll.insert(
                            {
                                username : msg.username, 
                                password : hashPassword, 
                                firstname : msg.firstname, 
                                lastname: msg.lastname, 
                            }, function(err, user){
                                if (err){
                                    throw err;
                                }
                                else {
                                    //return res.status(201).json({message: "Signed up successfully"});
                                    console.log("in signup kafka");
                                    console.log(JSON.stringify(user));
                                    createFolder(user.ops[0]);
                                    res.code = 201;
                                    res.value = user.ops[0];
                                    callback(null, res);
                                }
                            }
                        );
                    }
                }
            });
        }
        else{

            coll.findOne({username: msg.username}, function(err, user){
                if (user) {
                    //done(null, user);
                    console.log(user);
                    //var de_Password = CryptoJS.AES.decrypt((user.password).toString(), 'CCHIKP2' );
                    //var password = de_Password.toString(CryptoJS.enc.Utf8);
                    if(bcrypt.compareSync(msg.password, user.password)){}
                    //if(user.password == msg.password){
                        res.code = "200";
                        res.value = user;
                    }
                    else{
                        res.code = "401";
                        res.value = "Failed Login";
                    }

                } else {
                    //done(null, false);
                    res.code="401";
                    res.value="Failed Login";
                }
                callback(null, res);
            });
        }
        pool.releaseConnection(conn);
   // });
}

function createFolder(){
    console.log("creating folder for user");
}

exports.handle_request = handle_request;