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

   socket.emit('sendContents', classDiagram.getContents());

   socket.on('createContent', function (from, data, fn) {
   		let content = classDiagram.createContent(data, from);

   		//Notify message
   		fn(content.name, content.changed_by[content.changed_by.length-1]);

   		//Notify all changes
   		socket.emit('sendContents', classDiagram.getContents());
   });

   socket.on('createContentComposed', function (from, data, fn) {
      let content = classDiagram.createContentComposed(data.name, data.parent, from);

      data.childrens.forEach(function(element) {
          classDiagram.addChildren(content.name, element.name, element.region)
      });

      //Notify message
      fn(content.name, content);

      //Notify all changes
      socket.emit('sendContents', classDiagram.getContents());
   });


   socket.on('addMovimentConstraint', function (from, data, fn) {
   		let contents = classDiagram.getContents();

   		for(var i = 0; i < contents.length; i++) {
            if (contents[i].name == data.name) {
            	let content = contents[i];
                content.addMovimentConstraint(data.pointId, data.moviment, from);
          		
          		//Returns the operation
                fn(content.name, content.changed_by[content.changed_by.length-1]);
            	break;
            }
        }    
   });
});

