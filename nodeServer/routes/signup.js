var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//var mongo = require("./mongo");
//var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./kafka/client');  

module.exports = function(passport) {
    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            var reqUsername = req.body.username;
            var reqPassword = req.body.password;
            var reqFirstname = req.body.firstname;
            var reqLastname = req.body.lastname;
            //var reqdob = req.body.dateofBirth;
            //var reqCity = req.body.city;

            //console.log(reqdob);
            //console.log(req.body.dateofBirth);

            //params: topic, payload, cb
            kafka.make_request('login_topic', 'USER_SIGNUP', {"username":reqUsername,"password":reqPassword, "firstname" : reqFirstname, "lastname":reqLastname}, function(err,results){
                console.log('in result');
                console.log(results);
                if(err){
                    done(err,{});
                }
                else
                {
                    if(results.code == 201){
                        done(null,results);
                    }
                    else {
                        done(null,false);
                    }
                }
            });
        })
    );
};


