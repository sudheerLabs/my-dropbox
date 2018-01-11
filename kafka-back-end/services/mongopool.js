'use strict';
var maxPoolSize;
var MongoClient = require('mongodb').MongoClient;
var mongoURL = "mongodb://localhost:27017/dropbox";
var availableConnections = [];


function creatMongoPool(poolsize) {
	maxPoolSize = poolsize;
	for (var i=0; i< maxPoolSize; i++){
	    MongoClient.connect(mongoURL, function(err, _db){
	        if (err) { 
	        	throw new Error('Error in connection: '+err); 
	        }
	        availableConnections.push(_db);
	    });
	}
}

function getConnection(){
	if(availableConnections.length > 0){
		console.log("fetching connection");
		var connectionObj = availableConnections.pop();
		console.log("fetched "+connectionObj);
		return connectionObj;
	}
	else {
		var connectionCheck = setInterval(function() {
			if(availableConnections.length > 0){
				clearInterval(connectionCheck);
				var connectionObj = availableConnections.pop();
				return connectionObj;
				
			}
		}, 200);
	}
}

function releaseConnection(connection){
	console.log("release conenction to pool");
	availableConnections.push(connection);
	
}




exports.creatMongoPool = creatMongoPool;
exports.getConnection = getConnection;
exports.releaseConnection = releaseConnection;