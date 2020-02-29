
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../socket/socket'; // import de todos los métodos 




export default class Server {

    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer : http.Server; // se necesita http para trabajar con socket ya que express no lo permite nativamente


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);// se pasa la configuración de express
        this.io = socketIO(this.httpServer);
        this.escucharSocket();
    }

//configuración del patron singleton para garantizar que solo se tenga una instacia del socket
    public static get instance(){
        // se rerona la instancia o si esta vacia se crea una nueva
        return this._instance || (this._instance = new this());
    }
    private escucharSocket(){
        console.log('escuchando conexiones - socket');
        this.io.on('connection', client =>{
            console.log('cliente conectado' + client);
            //Mensajes recibidos
            socket.listenToMessage(client,this.io);
            //Cuando se desconecta el cliente
            socket.disconnect(client);
        });

        
    }

    start( callback: Function ) {

        // this.app.listen( this.port, callback );
        this.httpServer.listen( this.port, callback );
    }

}