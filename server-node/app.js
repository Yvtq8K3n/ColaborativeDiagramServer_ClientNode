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
   console.log('A new connection was created on socket:', socket.id);

   //Create diagram
   let classDiagram = new Diagram("ClassDiagram", "Yvtq8k3n");

   //Sending Diagram Contents
   socket.emit('contents', classDiagram.getContents());

   socket.on('createContent', function (data, fn) {
   		let content = classDiagram.createContent(data, data.creator);

   		//Notify message
   		fn(content.name, content.changed_by[content.changed_by.length-1]);

   		//Notify all changes
   		socket.emit('contents', classDiagram.getContents());
   });

   socket.on('createContentComposed', function (data, fn) {
      let content = classDiagram.createContentComposed(data.name, data.parent, data.creator);

      data.childrens.forEach(function(element) {
          classDiagram.addChildren(content.name, element.name, element.region, element.percentage);
      });

      //Notify message
      fn(content.name, content);

      //Notify all changes
      socket.emit('contents', classDiagram.getContents());
   });


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
   });
});

