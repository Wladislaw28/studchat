import socket from 'socket.io';
import http from 'http';

export default (http: http.Server):any => {
    const io = socket(http);

    io.on("connection", function(socket: socket.Socket) {
        //
    });

    return io;
}