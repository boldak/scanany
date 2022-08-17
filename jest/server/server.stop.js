const io = require('socket.io-client');
const port = process.env.SERVE_PORT || 9999;

const socketClient = io.connect(`http://localhost:${port}`);

socketClient.on('connect', () => {
    socketClient.emit('stopTestingServer');
    setTimeout(() => {
        process.exit(0);
    }, 1000);
});