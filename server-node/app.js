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

    //Sending Diagram Contents
    console.log("Sending the latest data!(Content, Selectors...)\n");
    socket.emit('contents', classDiagram.getContents());
    socket.emit('selectors', classDiagram.getSelectors());

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /// Contents 																             		  ///
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    socket.on('createContent', function (data, fn) {
    	try{
    		let content = classDiagram.createContent(data, data.creator);

	    	//Notify message
	   		fn(data.name+": Content was created ", content);
	   		console.log(data.creator +" created Content:"+data.name);

	   		//Notify all other clients
	   		socket.broadcast.emit('contentCreated', content);
    	}catch(err) {
    		console.log("Error");
    		console.log(err);
		  	//Notify error
	   		//fn(data.name+": "+err);
		}   		
    });
    socket.on('createContentComposed', function (data, fn) {
    	try{
    		//Retrieve Parent
    		let parent = classDiagram.retrieveContent(data.parent);
        	let clonedParent = JSON.parse(JSON.stringify(parent));
        	let content = classDiagram.createContentComposed(data.name, clonedParent, data.creator, data.rotation);

	        //Notify message
	        fn(data.name+": Content was created ", content);
	        console.log(data.creator +" created ContentComposed:"+data.name);

	   		//Notify all other clients
	   		socket.broadcast.emit('contentCreated', content);
    	}catch(err) {
		  	//Notify error
	   		fn(data.name+": "+err);
		}   	
    });
    socket.on('addContentComposedChild', function (data, fn) {
    	try{
	     	//Retrieve ContentComposed
	     	let content = classDiagram.retrieveContent(data.composed);

	     	//Retrieve Child
        	let child = classDiagram.retrieveContent(data.name);
	        let clonedChild = JSON.parse(JSON.stringify(child));
        	let childId = content.addChildren(clonedChild, Region[data.region], data.percentage, data.creator);

	        //Notify message
	        fn(data.name+" was added to content "+data.composed);
	        console.log(data.creator +" added as child:"+data.name+" to ContentComposed:"+content.name);

	   		//Notify all clients
	   		io.sockets.emit('contentChildAdded', {content: content, childId: childId});
    	}catch(err) {
		  	//Notify error
	   		fn(data.composed+": "+err);
		}   	
    });

    /*
    socket.on('addMovimentConstraint', function (data, fn) {
   		let contents = classDiagram.getContents();

   		for(var i = 0; i < contents.length; i++) {
            if (contents[i].name == data.name) {
            	let content = contents[i];
                content.addMovimentConstraint(data.pointId, data.moviment, data.creator);
          		
          		//Returns the operation
                fn(content.name, content.changed_by[content.changed_by.length-1]);
            	break;
            }
        }    
    });*/

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /// Selectors																             		  ///
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    socket.on('createSelector', function (data, fn) {
    	try{
	     	//Retrieve Content
	     	let content = classDiagram.retrieveContent(data.content);

		    //Create Selector
		    let selector = classDiagram.createSelector(data.name, content, data.amount, data.corners, data.creator);

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

