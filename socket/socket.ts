import {Socket} from 'socket.io';
import socketIO from 'socket.io';


export const disconnect = (client: Socket) => {

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    })
}


export const listenToMessage = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('message',(data: {from: string, body: string}) => {
        console.log('Mensaje recibido', data);
        io.emit('newMessage',data);
    })
}