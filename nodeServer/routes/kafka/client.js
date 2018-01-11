var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(queue_name, action, msg_payload, callback){
    console.log('in make request of files');
    console.log(action);
    console.log(msg_payload);
    console.log(queue_name);
    //console.log(msg_payload.path);
	rpc.makeRequest(queue_name, action, msg_payload, function(err, response){

		if(err)
			console.error(err);
		else{
			console.log("response", response);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;
