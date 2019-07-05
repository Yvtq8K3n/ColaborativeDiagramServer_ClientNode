#!/usr/bin/env node

//Has args?
const args = {};
process.argv
    .slice(2, process.argv.length)
    .forEach( arg => {
        // long arg
        if (arg.slice(0,2) === '--') {
            const longArg = arg.split('=');
            const longArgFlag = longArg[0].slice(2,longArg[0].length);
            const longArgValue = longArg.length > 1 ? longArg[1] : true;
            args[longArgFlag] = longArgValue;
        }
    });

//server.js
var http = require('http').createServer();
var io = require('socket.io')(http);
var axios=require('axios');
var Diagram = require('../lib/diagram.js');

if(typeof args.port == "undefined") args.port = 8080;
if(typeof args.ip == "undefined") args.ip = "localhost";

http.listen(args.port, args.ip, function () {
  console.log('listening on port *:'+args.port);
});

//Constants
const Region = Object.freeze({
    "NORTH":{x: 0.5, y:0}, "SOUTH":{x: 0.5, y:1}, 
    "WEST":{x: 0, y:0.5}, "EAST":{x: 1, y:0.5},
    "NORTHWEST":{x: 0, y:0}, "NORTHEAST":{x: 1, y:0},
    "SOUTHWEST":{x: 0, y:1}, "SOUTHEAST":{x: 1, y:1},
    "CENTER":{x: 0.5, y: 0.5}
});

//const MovimentType = Object.freeze({{"V":"vertical", "H":"horizontal", "DA":"diagonalasc", "DD":"diagonaldes", "ANY":"any"});
function getKeyByValue(object, value) {
   return Object.keys(object).find(key => object[key] === value);
}


//Create diagram
let classDiagram = new Diagram("ClassDiagram", "Yvtq8k3n");

//////////////////////////////////////////////////////
io.on('connection', function (socket){
    console.log('A new connection was created on socket:', socket.id);

    //Sending Diagram elements
    console.log("Sending the latest data!(Elements, Representations...)\n");
    socket.emit('elements', classDiagram.getElements());
    //socket.emit('representations', classDiagram.getSelectors());

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /// Elements																             		  ///
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    socket.on('createElement', function (data, fn) {
    	try{
    		let element = classDiagram.createElement(data, data.creator);

	    	//Notify message
	   		fn(data.name+": element was created ", element);

	   		console.log(data.creator +" sucessfully created element: "+data.name);
	   		console.log(element);
	   		//Notify all other clients
	   		socket.broadcast.emit('elementCreated', element);
    	}catch(err) {
    		console.log("Error");
    		console.log(err);
		  	//Notify error
	   		//fn(data.name+": "+err);
		}   		
    });
    socket.on('createComposedElement', function (data, fn) {
    	try{
    		try{
    		let composed = classDiagram.createElement(data, data.creator);

	    	//Notify message
	   		fn(data.name+": composed element was created ", composed);
	   		console.log(data.creator +" successfully created composed element: "+data.name);

	   		//Notify all other clients
	   		socket.broadcast.emit('elementCreated', composed);
    	}catch(err) {
    		console.log("Error");
    		console.log(err);
		  	//Notify error
	   		//fn(data.name+": "+err);
		}   
    	}catch(err) {
		  	//Notify error
	   		fn(data.name+": "+err);
		}   	
    });
    socket.on('addElementComposedChild', function (data, fn) {
    	try{
	     	//Retrieve representationComposed
	     	/*let representation = classDiagram.retrieveRepresentation(data.composed);

	     	//Retrieve Child
        	let child = classDiagram.retrieveRepresentation(data.name);
	        let clonedChild = JSON.parse(JSON.stringify(child));
        	let childId = representation.addChildren(clonedChild, Region[data.region], data.percentage, data.creator);

	        //Notify message
	        fn(data.name+" was added to representation "+data.composed);
	        console.log(data.creator +" added as child:"+data.name+" to representationComposed:"+representation.name);

	   		//Notify all clients
	   		io.sockets.emit('representationChildAdded', {representation: representation, childId: childId});*/
    	}catch(err) {
		  	//Notify error
	   		fn(data.composed+": "+err);
		}   	
    });

    /*
    socket.on('addMovimentConstraint', function (data, fn) {
   		let representations = classDiagram.getrepresentations();

   		for(var i = 0; i < representations.length; i++) {
            if (representations[i].name == data.name) {
            	let representation = representations[i];
                representation.addMovimentConstraint(data.pointId, data.moviment, data.creator);
          		
          		//Returns the operation
                fn(representation.name, representation.changed_by[representation.changed_by.length-1]);
            	break;
            }
        }    
    });*/

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /// Selectors																             		  ///
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /*socket.on('createSelector', function (data, fn) {
    	try{
	     	//Retrieve representation
	     	let representation = classDiagram.retrieveRepresentation(data.representation);

		    //Create Selector
		    let selector = classDiagram.createSelector(data.name, data.creator, representation, data.amount, data.corners, data.constructions);

	        //Notify message
	        fn(data.name+": Selector was created", selector);
	        console.log(data.creator +" created a Selector:"+data.name);

	   		//Notify all other clients
	   		io.sockets.emit('selectorCreated', selector);
    	}catch(err) {
		  	//Notify error
	   		fn(data.name+": "+err);
		}   	
    });
    //Só pode ser possivel se o selector possui um element. Um elemento tem uma instancia de um selector.
    socket.on('moveSelector', function (data, fn) {
    	try{

	     	//Retrieve Selector/Deveria fazer retrieve do selector do element invez disto
	     	let selector = classDiagram.retrieveSelector(data.name);

		    //Retrieve point
		    let selectorPoint = selector.getSelectorPoint(data.id);

		    //Move 
		    if (typeof data.amount !== "undefined") selectorPoint.move(data.amount);
		    else if (typeof data.point !== "undefined") selectorPoint.moveToPoint(data.point);

	        //Notify message
	        fn(data.name+": Selection Point "+data.id+" was moved");
	        console.log("Selection Point "+data.id+" was moved on Element:");

	   		//Notify all other clients
	   		io.sockets.emit('selectorCreated', selector);
    	}catch(err) {
		  	//Notify error
	   		fn(data.name+": "+err);
		}   	
    });*/

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /// Elements																             		  ///
    /////////////////////////////////////////////////////////////////////////////////////////////////////

     socket.on('disconnect', function () {
       console.log('user disconnected');
    });
});

