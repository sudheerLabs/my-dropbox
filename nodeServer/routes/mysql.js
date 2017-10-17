var mysql = require('mysql');

/*
//Put your mysql configuration settings - user, password, database and port
function getConnection_b(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'tester',
	    password : 'zaq@123',
	    database : 'test',
	    port	 : 3306
	});
	return connection;
}
*/

function getConnection(){
	var pool      =    mysql.createPool({
	    connectionLimit : 100, //important
	     host     : 'localhost',
	    user     : 'tester',
	    password : 'zaq@123',
	    database : 'test',
	    debug    :  false
	});
	return pool;
}


/*
function fetchData_b(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	
*/

function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query:: pooling"+sqlQuery);

	var pool=getConnection();

	pool.getConnection(function(err, connection) {
	  // Use the connection
	  connection.query(sqlQuery, function (error, results, fields) {
	    // And done with the connection.
	    connection.release();

	    if (error) throw error;
	    else
	    	callback(error, results);

	  });
	});
}	

exports.fetchData=fetchData;