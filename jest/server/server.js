const express = require("express");
const app = express();
const server = require('http').createServer(app);

const port = process.env.SERVE_PORT || 9999;

app.use(express.static(__dirname + '/web'));
server.listen(port, () => {
    console.log(`HTTP server listening on port ${port}.`);
});


// Required to stop the server after testing
const io = require('socket.io')(server);
io.on('connection', (socketServer) => {
    socketServer.on('stopTestingServer', () => {
        console.log('Terminating testing server per request.')
        process.exit(0);
    });
});