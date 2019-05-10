//server.js
var http = require('http').createServer();
var io = require('socket.io')(http);
var axios=require('axios');
var Diagram = require('./diagram.js');

http.listen(9000, function () {
  console.log('listening on *:8080');
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

    //Sending Diagram representations
    console.log("Sending the latest data!(Representations, Selectors...)\n");
    socket.emit('representations', classDiagram.getRepresentations());
    socket.emit('selectors', classDiagram.getSelectors());

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /// representations 																             		  ///
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    socket.on('createRepresentationSimple', function (data, fn) {
    	try{
    		let representation = classDiagram.createRepresentationSimple(data, data.creator);

	    	//Notify message
	   		fn(data.name+": representation was created ", representation);
	   		console.log(data.creator +" created representation simples:"+data.name);

	   		//Notify all other clients
	   		socket.broadcast.emit('representationCreated', representation);
    	}catch(err) {
    		console.log("Error");
    		console.log(err);
		  	//Notify error
	   		//fn(data.name+": "+err);
		}   		
    });
    socket.on('createRepresentationComposed', function (data, fn) {
    	try{
    		//Retrieve Parent
    		let parent = classDiagram.retrieveRepresentation(data.parent);
        	let clonedParent = JSON.parse(JSON.stringify(parent));
        	let representation = classDiagram.createRepresentationComposed(data.name, clonedParent, data.creator, data.rotation);

	        //Notify message
	        fn(data.name+": representation was created ", representation);
	        console.log(data.creator +" created representation composed:"+data.name);

	   		//Notify all other clients
	   		socket.broadcast.emit('representationCreated', representation);
    	}catch(err) {
		  	//Notify error
	   		fn(data.name+": "+err);
		}   	
    });
    socket.on('addRepresentationComposedChild', function (data, fn) {
    	try{
	     	//Retrieve representationComposed
	     	let representation = classDiagram.retrieveRepresentation(data.composed);

	     	//Retrieve Child
        	let child = classDiagram.retrieveRepresentation(data.name);
	        let clonedChild = JSON.parse(JSON.stringify(child));
        	let childId = representation.addChildren(clonedChild, Region[data.region], data.percentage, data.creator);

	        //Notify message
	        fn(data.name+" was added to representation "+data.composed);
	        console.log(data.creator +" added as child:"+data.name+" to representationComposed:"+representation.name);

	   		//Notify all clients
	   		io.sockets.emit('representationChildAdded', {representation: representation, childId: childId});
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
    socket.on('createSelector', function (data, fn) {
    	try{
	     	//Retrieve representation
	     	let representation = classDiagram.retrieveRepresentation(data.representation.name);

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
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /// Elements																             		  ///
    /////////////////////////////////////////////////////////////////////////////////////////////////////

     socket.on('disconnect', function () {
       console.log('user disconnected');
    });
});

