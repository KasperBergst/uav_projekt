import { WebSocketServer } from 'ws';

export default class Websocket {
    #connections = [];
    #wss = new WebSocketServer({ port: 8080 }); 
    constructor()
    {
        this.#wss.on('connection', ws => this.#connections.push(ws));
    }

    send(data)
    {
        this.#connections.forEach(ws => ws.send(JSON.stringify(data)));
    }
}