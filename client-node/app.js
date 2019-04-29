//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:9000', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

socket.on('contents', function (data) {
	console.log("Contents:")
	console.log(data);
	//console.log(JSON.stringify(data, null, 4));
});

socket.emit('createContent',
	{
		name:"MyTriangle", 
		points: [
			{id: 0, x: 0.5, y: 0},
			{id: 1, x: 0,   y: 1},
			{id: 2, x: 1,   y: 1}
		],
		rotation: 0,
		creator: "client-node" 
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\nContent: "+message);
	}
);

//Create Illuminati
socket.emit('createContentComposed',
	{
		name:"Illuminati",
		parent:"MyTriangle", 
		creator: "client-node"
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\nContentComposed: "+message);  		
	}
);
socket.emit('addContentComposedChild',
	{
		composed:"Illuminati",
		name: "Hexagon", 
		region: "NORTH", 
		percentage: 0.4
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\nContentComposedChild: "+message);
	}
);

//Create Funny everywhere IlluminatiMeme
socket.emit('createContentComposed',
	{
		name:"IlluminatiIsReal",
		parent:"Illuminati", 
		creator: "client-node"
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\nContentComposed: "+message);  		
	}
);
socket.emit('addContentComposedChild',
	{
		composed:"IlluminatiIsReal", 
		name: "Illuminati", 
		region: "NORTHWEST", 
		percentage: 0.2
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\nContentComposedChild: "+message);
	}
);
socket.emit('addContentComposedChild',
	{
		composed:"IlluminatiIsReal", 
		name: "Illuminati", 
		region: "EAST", 
		percentage: 0.2
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\nContentComposedChild: "+message);
	}
);
socket.emit('addContentComposedChild',
	{
		composed:"IlluminatiIsReal", 
		name: "Illuminati", 
		region: "SOUTH", 
		percentage: 0.2
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\nContentComposedChild: "+message);
	}
);


socket.emit('createSelector',
	{
		name: "MySelector", 
		content: "Square", 
		amount: 7,
		creator: "Yvtq8k3n"
	}, function (message, data) { // args are sent in order to acknowledgement function
		console.log("\n"+message +" Data:"+ data);
	}
);


/*socket.emit('addMovimentConstraint',
	{
		name:"MyTriangle",
		pointId : 0,
		moviment: "horizontal",
		creator: "client-node"
	}, function (name, data) { // args are sent in order to acknowledgement function
		console.log("\nMovimentConstraint: "+name);
  		console.log(data);
	}
);*/



/*socket.on('contents', function (data) {
	console.log(JSON.stringify(data, null, 4));
});*/







//socket.emit('CH01', 'me', 'test msg');
