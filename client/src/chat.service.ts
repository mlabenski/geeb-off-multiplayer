//simple chat service
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }
    // for this to work we have to use sendMessage() from app comp
    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    //Returns an observable by creating with Observable.create
    //everytime socket recieves a msg itll use observer.next() to forward it
    public getMessages = () => {
        console.log("here");
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            })
        })
    }
}