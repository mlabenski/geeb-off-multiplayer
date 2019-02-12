//simple chat service
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }
    P1= 1
    P2= 2;
    // for this to work we have to use sendMessage() from app comp
    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }
    // TODO: Add player name to be sent to this function 
    public newGame(name) {
        if(!name) {
            alert('Please enter your name!');
            return;
        }
        this.socket.emit('createGame', {name: name});
        //player = new Player(name, this.P1);
    }

    public joinGame(name, roomID){

    }

    //Returns an observable by creating with Observable.create
    //everytime socket recieves a msg itll use observer.next() to forward it
    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            })
        })
    }
}