var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var files = require('./services/files');
var mongopool = require('./services/mongopool');


mongopool.creatMongoPool(20);

//var topic_name = 'login_topic';
var topic_name = [{topic: 'login_topic', partition : 0}, {topic: 'files_topic', partition : 0}];
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

/*
consumer.addTopics([{topic: 'files_topic'}], function (err, added) {
    console.log("topic added");
});
*/

console.log('server is running');

consumer.on('error', function(err){
    console.log(err);
});


consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    
    if(data.sendFrom == "login_topic"){
        login.handle_request(data.data, data.action, function(err,res){
            console.log('after handle'+res);
            console.log(res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    }

    if(data.sendFrom == "files_topic"){
        files.handle_request(data.data, data.action, function(err,res){
            console.log('after handling files');
            console.log(res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        return;
    }
});