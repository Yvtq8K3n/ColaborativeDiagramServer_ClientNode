//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

socket.on('sendContents', function (data) {
	console.log("Contents:")
	console.log(data);
});

//console.log(JSON.stringify(data, null, 4));
socket.emit('createContent', 'client-node', 
	{
		name:"MyTriangle", 
		points: [
			{x: 0.5, y: 0},
			{x: 0,   y: 1},
			{x: 1,   y: 1}
		]
	}, function (name, data) { // args are sent in order to acknowledgement function
		console.log("\nContentCreate: "+name);
  		console.log(data);
	}
);


socket.emit('addMovimentConstraint', 'client-node',
	{
		name:"MyTriangle",
		pointId : 0,
		moviment: "horizontal"
	}, function (name, data) { // args are sent in order to acknowledgement function
		console.log("\nMovimentConstraint: "+name);
  		console.log(data);
	}
);



socket.on('sendContentList', function (data) {
	//console.log("List Contents");
	//console.log(data);

	//console.log(JSON.stringify(data, null, 4));
});







//socket.emit('CH01', 'me', 'test msg');
