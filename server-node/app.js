//server.js
var http = require('http').createServer();
var io = require('socket.io')(http);
var axios=require('axios');
var Diagram = require('./diagram.js');

http.listen(8080, function () {
  console.log('listening on *:8080');
});

//////////////////////////////////////////////////////

io.on('connection', function (socket){
   console.log('connection');
   let classDiagram = new Diagram("ClassDiagram", "Yvtq8k3n");

   socket.emit('sendShapesList', classDiagram.getShapes());

   socket.on('createContent', function (from, data, fn) {
   		let content = classDiagram.createContent(data, from);

   		fn(content.changedby[content.changedby.length-1]);
   });


   socket.on('addMovimentConstraint', function (from, data, fn) {
   		let contents = classDiagram.getContents();

   		for(var i = 0; i < contents.length; i++) {
            if (contents[i].name == data.name) {
            	let content = contents[i];
                content.addMovimentConstraint(data.pointId, data.moviment, from);
          		
          		//Returns the operation
                fn(content.changedby[content.changedby.length-1]);
            	break;
            }
        }    
   });
});

