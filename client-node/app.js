//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

socket.on('contents', function (data) {
	console.log("Contents:")
	console.log(data);
});

//console.log(JSON.stringify(data, null, 4));
socket.emit('createContent',
	{
		name:"MyTriangle", 
		points: [
			{id: 0, x: 0.5, y: 0},
			{id: 1, x: 0,   y: 1},
			{id: 2, x: 1,   y: 1}
		],
		rotation: 0.5,
		creator: "client-node" 
	}, function (name, data) { // args are sent in order to acknowledgement function
		console.log("\nContentCreate: "+name);
  		console.log(data);
	}
);

socket.emit('addMovimentConstraint',
	{
		name:"MyTriangle",
		pointId : 0,
		moviment: "horizontal",
		creator: "client-node"
	}, function (name, data) { // args are sent in order to acknowledgement function
		console.log("\nMovimentConstraint: "+name);
  		console.log(data);
	}
);

socket.emit('createContentComposed',
	{
		name:"CustomSquare",
		parent:"MyTriangle", 
		childrens: [
			{name: "Triangle", region: "North", percentage: 0.7},
			{name: "Triangle", region: "North", percentage: 0.5}
		],
		creator: "client-node"
	}, function (name, data) { // args are sent in order to acknowledgement function
		console.log("\nContentCreatedComposed: "+name);
  		console.log(data);
  		console.log(JSON.stringify(data, null, 4));
  		
	}
);



/*socket.on('contents', function (data) {
	console.log(JSON.stringify(data, null, 4));
});*/







//socket.emit('CH01', 'me', 'test msg');
