module.exports.chatSockets = function(chatServer){
    const io = require('socket.io')(chatServer);

    io.sockets.on('connection', function(socket){
        console.log('New connection established successfully with', socket.id);
        io.sockets.on('disconnect', function(){
            console.log('Socket is disconnected!');
        });
    });

}