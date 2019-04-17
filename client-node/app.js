//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

socket.on('sendContentList', function (data) {
	console.log(data);

	console.log(JSON.stringify(data, null, 4));
});

socket.emit('CH01', 'me', 'test msg');
