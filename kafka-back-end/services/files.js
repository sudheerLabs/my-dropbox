var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var ObjectID = require('mongodb').ObjectID;
var pool = require("./mongopool");

function handle_request(msg, action, callback){

    var res = {};
    console.log("In handle request of files:"+ JSON.stringify(msg));

    var conn = pool.getConnection();
    console.log('Connected to mongo at: ' + mongoURL);
    console.log(conn);
    var coll = mongo.collection(conn, 'userfiles');


//        mongo.connect(mongoURL, function(){
//            console.log('Connected to mongo at: ' + mongoURL);
//            var coll = mongo.collection('userfiles');

            //var path = ',root,' + msg.path + ',';

            if(action == "GET_FILES"){
                coll.find({path: msg.path}).toArray(function(err, files){
                    console.log(files);
                    if (files) {
                        //done(null, user);
                        res.code = "200";
                        res.value = files;

                    } else {
                        //done(null, false);
                        res.code="401";
                        res.value="Failed to fetch files";
                    }
                    callback(null, res);
                });
            }

            if(action == "TOGGLE_STAR"){
                console.log("Inside Toggle star");
                let id = new ObjectID(msg.id);
                coll.findOne({_id: id}, function(err, file){
                    if (file) {
                        console.log(file);
                        const star = file.starred == "Y" ? "N": "Y" ;
                        console.log("star is " + star);
                        coll.updateOne({entity: file.entity},{ $set: { starred: star } }, function(err, result){
                            console.log("update success");
                            console.log(JSON.stringify(result.result.n));
                            if(result.result.n ==1){
                                res.code="200";
                                res.value= "successfully updated";
                            }else{
                                res.code="401";
                                res.value="Failed toggling";
                            }
                            callback(null,res);
                        });

                    } else {
                        //done(null, false);
                        res.code="401";
                        res.value="Failed toggling";
                        callback(null, res);
                    }
                    
                });
            }

            if(action == "DELETE_FILE"){
                console.log("Inside delete file");
                let id = new ObjectID(msg.id);
                   
                coll.updateOne({_id: id},{ $set: { deleted: "Y" } }, function(err, result){
                    console.log("update success");
                    console.log(JSON.stringify(result.result.n));
                    if(result.result.n ==1){
                        res.code="200";
                        res.value= "successfully deleted";
                    }else{
                        res.code="401";
                        res.value="Failed delete op";
                    }
                    callback(null,res);
                });
            }

            if(action == "FILE_UPLOAD"){
                console.log("Inside creating file");
                   
                coll.insert(
                {
                    entity : msg.filename, 
                    path : msg.path, 
                    type : "file", 
                    author: msg.user,
                    deleted: "N",
                    starred: "N" 
                }, function(err, file){
                    if (err){
                        throw err;
                    }
                    else {
                        //return res.status(201).json({message: "Signed up successfully"});
                        console.log("in createfolder kafka");
                        console.log(JSON.stringify(file));
                         console.log(file.ops[0]);
                        res.code = 201;
                        res.value = file.ops;
                        callback(null, res);
                    }
                });
            }

            if(action == "CREATE_FOLDER"){
                console.log("Inside creating folder");
                   
                coll.insert(
                {
                    entity : msg.folder, 
                    path : msg.path, 
                    type : "folder", 
                    author: msg.user,
                    deleted: "N",
                    starred: "N" 
                }, function(err, folder){
                    if (err){
                        throw err;
                    }
                    else {
                        //return res.status(201).json({message: "Signed up successfully"});
                        console.log("in createfolder kafka");
                        console.log(JSON.stringify(folder));
                        console.log(folder.ops[0]);
                        res.code = 201;
                        res.value = folder.ops;
                        callback(null, res);
                    }
                }
                );
            }

            if(action == "SHARE_FILE"){
                console.log("Inside sharing file");
                   
                coll.insert(
                {
                    entity : msg.filename, 
                    path : ',root,' + msg.userlist + ',',
                    type : "file", 
                    author: msg.username,
                    deleted: "N",
                    starred: "N",
                    shared: "Y"
                }, function(err, folder){
                    if (err){
                        throw err;
                    }
                    else {
                        //return res.status(201).json({message: "Signed up successfully"});
                        console.log("in share file kafka");
                        console.log(JSON.stringify(folder));
                        console.log(folder.ops[0]);
                        res.code = 201;
                        res.value = folder.ops;
                        callback(null, res);
                    }
                });
            }
            pool.releaseConnection(conn);
//        });

/*
    if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
*/
   // callback(null, res);
}

exports.handle_request = handle_request;