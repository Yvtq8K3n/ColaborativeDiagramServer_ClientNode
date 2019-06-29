//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:9000', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

socket.on('elements', function (data) {
	console.log("elements:");
	console.log(data);
	//console.log(JSON.stringify(data, null, 4));
});

socket.on('elementCreated', function (data) {
	console.log("\n\n\n\nSomeone created a new element!");
	console.log(data);
	//console.log(JSON.stringify(data, null, 4));
});

socket.emit('createElement',
	{
		name:"MyTriangle", 
		points: [
			{id: 0, x: 0.5, y: 0},
			{id: 1, x: 0,   y: 1},
			{id: 2, x: 1,   y: 1}
		],
		rotation: 0,
		creator: "client-node" 
	}, function (message, data) { // args are sent in order to acknowledgement function
		console.log("\nContent: "+message, data);
	}
);



//Create Illuminati
/*socket.emit('createContentComposed',
	{
		name:"Illuminati",
		parent:"MyTriangle", 
		creator: "client-node"
	}, function (message, data) { // args are sent in order to acknowledgement function
		console.log("\nContentComposed: "+message, data);  		
	}
);*/
/*socket.emit('addContentComposedChild',
	{
		composed:"Illuminati",
		name: "Hexagon", 
		region: "NORTH", 
		percentage: 0.4,
		creator: "client-node"
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
	}, function (message, data) { // args are sent in order to acknowledgement function
		console.log("\nContentComposed: "+message, data);  		
	}
);
socket.emit('addContentComposedChild',
	{
		composed:"IlluminatiIsReal", 
		name: "Illuminati", 
		region: "NORTHWEST", 
		percentage: 0.2,
		creator: "client-node"
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\nContentComposedChild: "+message);
	}
);
socket.emit('addContentComposedChild',
	{
		composed:"IlluminatiIsReal", 
		name: "Illuminati", 
		region: "EAST", 
		percentage: 0.2,
		creator: "client-node"
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\nContentComposedChild: "+message);
	}
);
socket.emit('addContentComposedChild',
	{
		composed:"IlluminatiIsReal", 
		name: "Illuminati", 
		region: "SOUTH", 
		percentage: 0.2,
		creator: "client-node"
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\nContentComposedChild: "+message);
	}
);


socket.emit('createSelector',
	{
		name: "MySelector", 
		representation: "Square", 
		amount: 4,
		corners: true,
		creator: "client-node"
	}, function (message, data) { // args are sent in order to acknowledgement function
		console.log("\Selector: "+message, data);
	}
);

/*socket.emit('moveSelector',
	{
		name: "MySelector", 
		id: 0, 
		amount: 20,
		creator: "Yvtq8k3n"
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\n"+message);
	}
);

socket.emit('moveSelector',
	{
		name: "MySelector", 
		id: 2, 
		point: {x: 50, y:100},
		creator: "Yvtq8k3n"
	}, function (message) { // args are sent in order to acknowledgement function
		console.log("\n"+message);
	}
);*/

/*socket.emit('createSelector',
	{
		name: "2SimpleSelector", 
		representation: "Square", 
		amount: 8,
		corners: false,
		constructions: null,
		creator: "client-node"
	}, function (message, data) { // args are sent in order to acknowledgement function
		console.log("\Selector: "+message, data);
	}
);

socket.emit('createSelector',
	{
		name: "ComplexSimpleSelector", 
		representation: "Square", 
		corners: false,
		constructions: ["DEFAULT", "CORNERS", "CORNERS"],
		creator: "client-node"
	}, function (message, data) { // args are sent in order to acknowledgement function
		console.log("\Selector: "+message, data);
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
