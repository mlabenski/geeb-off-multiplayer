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

//make game lobby
var users = [];
var idsnicks = {};
var rooms = 0;
//listen for connection event of socket.Io and log when user established connection
io.sockets.on('connection', function(socket) {
    allClients.push(socket);
    console.log('user connected');

    socket.on('login', function (nick) {
        users.push(nick);
        socket.nick = nick;
        idsnicks[nick]=socket.id;
        io.emit('userlist', users);
    })
    socket.on('startchat', function  (data) {
        if (io.sockets.connected[idsnicks[data]]!==undefined) {
          io.sockets.connected[idsnicks[data]].emit('openchat', socket.nick);
        }
        })

    //add to the lobby

    socket.on('createGame', function(data) {
        socket.join('room-'+ ++rooms);
        socket.emit('newGame', {name: data.name, room: 'room-'+rooms})
    });

    //connect player2 when requesting to join
    socket.on('joinGame', function(data){
        var rooom = io.nsps['/'].adapter.rooms[data.room];
        if (room && room.length == 1){
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('player1', {});
            socket.emit('player2', {name: data.name, room: data.room})
        }
        else if (room.length ==2){
            socket.emit('err', {message: 'Sorry, The room is full!'});
        }
        else if (room == null) {
            socket.emit('err', {message: 'Sorry, The room does not exist'});
        }
    })

    //GAME LOGIC HERE
    // What info will the two clients need to exchage?
    // The time it took them for the geeb+ if it was successful
    // The video recording to be played

    socket.on('playTurn', function(data){
        socket.boardcast.to(data.room).emit('turnPlayed', {
            timeTaken: data.timeTaken, room: data.room
        });
        });

    socket.on('gameEnded', function(data) {
        socket.broadcast.to(data.room).emit('gameEnd'. data);
    });


    //send msg
    socket.on('new-message', (message) => {
        io.emit('new-message', message);
    })
    //disconnect
    socket.on('disconnect', function() {
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);
    })
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

//run with node index.js