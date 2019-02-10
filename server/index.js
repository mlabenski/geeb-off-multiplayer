// create instances of express and store it into app variable. etc
let express = require('express')
let app = express();

// passing express to http.Server() method
// express serves as handler for requests to server, 
//in return we get the instance of server which we store in server variable
let http = require('http');
let server = http.Server(app);
let connectCounter = 0;
//bind the socket.io with our http server
let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

var allClients = [];
//listen for connection event of socket.Io and log when user established connection
io.sockets.on('connection', function(socket) {
    allClients.push(socket);
    console.log('user connected');

    //send msg
    socket.on('new-message', (message) => {
        io.emit('new-message', message);
    })
    //disconnect
    socket.on('disconnect', function() {
        var i = allClients.indexOf(socket);
        console.log(allClients[i].id +' Got disconnected!');
        allClients.splice(i, 1);
    })
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

//run with node index.js