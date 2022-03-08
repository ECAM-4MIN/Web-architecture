// WEB SOCKET

// Import express
let express = require('express');
// Initialize the app
let app = express();

const http = require("http");
const server = http.createServer(app);


const {Server} = require("socket.io");
const io = new Server(server);

// INDEX
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
// METEO
app.get('/meteo',(req,res)=>{
    res.sendFile(__dirname+"/meteo.html");
});


io.on('connection',(socket)=>{
    console.log("a user is connected");

    socket.on('disconnect',() => {
        console.log('user disconneced');
    });

    socket.on('temp message',(msg)=>{
        //broadcast msg
        io.emit('temp message', msg);
        console.log('temperature: '+ msg);
    });

    socket.on('humid message',(msg)=>{
        //broadcast msg
        io.emit('humid message', msg);
        console.log('humidity: '+ msg);
    });
});





// Setup server port
let port = 3000;
// Launch app to listen to specified port
server.listen(port, function () {
console.log('Server running on port' + port);
});