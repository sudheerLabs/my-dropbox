var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//var mongo = require("./mongo");
//var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./kafka/client');

/*
module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username   , password, done) {
        try {
            mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('users');

                coll.findOne({username: username, password:password}, function(err, user){
                    if (user) {
                        done(null, user);

                    } else {
                        done(null, false);
                    }
                });
            });
        }
        catch (e){
            done(e,{});
        }
    }));
};

*/
///calls the kafka client with data and queue to which request to be sent
module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username , password, done) {
        console.log('in passport');
        kafka.make_request('login_topic', 'USER_LOGIN', {"username":username,"password":password}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    done(null,results);
                }
                else {
                    done(null,false);
                }
            }
        });
        /*try {
            if(username == "bhavan@b.com" && password == "a"){
                done(null,{username:"bhavan@b.com",password:"a"});
            }
            else
                done(null,false);
        }
        catch (e){
            done(e,{});
        }*/
    }));
};


