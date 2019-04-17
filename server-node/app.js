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
   socket.emit('sendContentList', classDiagram.getShapes());


  socket.on('CH01', function (from, msg) {
    	
  });

});

