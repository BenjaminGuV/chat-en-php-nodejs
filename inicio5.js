var server = require("socket.io").listen(8888);
 
server.sockets.on("connection", function(message)
{
    message.on("newMessage", function(data)
    {
        server.sockets.emit("sendEvent", data);
    });
});