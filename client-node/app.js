//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

socket.on('sendShapesList', function (data) {
	console.log(data);

	//console.log(JSON.stringify(data, null, 4));
	socket.emit('createContent', 'client-node', 
		{
			name:"MyTriangle", 
			shape:"Triangle"
		}, function (data) { // args are sent in order to acknowledgement function
			console.log("\nContentCreate");
      		console.log(data);
    	}
    );
	
	socket.emit('addMovimentConstraint', 'client-node',
		{
			name:"MyTriangle",
			pointId : 0,
			moviment: "horizontal"
		}, function (data) { // args are sent in order to acknowledgement function
			console.log("\nMovimentConstraint");
      		console.log(data);
    	}
    );

	socket.emit('createContent', 'client-node', 
		{
			name:"MySquare", 
			shape:"Square"
		}, function (data) { // args are sent in order to acknowledgement function
			console.log("\nContentCreate");
      		console.log(data);
    	}
    );


	socket.on('sendContentList', function (data) {
		//console.log("List Contents");
		//console.log(data);

		//console.log(JSON.stringify(data, null, 4));
	});
});







//socket.emit('CH01', 'me', 'test msg');
