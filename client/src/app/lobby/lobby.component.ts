import { Component } from '@angular/core';
import { ChatService } from 'src/chat.service';

//import and use the service for chat, then in constructor also

@Component({
  selector: 'app-lobby-view',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  title = 'geeb-off';
  player : string;
  roomID : number;
  message : string;
  messages: string[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
    console.log("hello");
  }

  newRoom() {
    this.chatService.newGame(this.player);
    this.player = '';
  }

  joinRoom() {
    this.chatService.joinGame(this.player, this.roomID);
    this.player = '';
    this.roomID = 0;
  }

  //subscribe to the getMessage observable 
  ngOnInit() {
    this.chatService
    .getMessages()
    .subscribe((message: string) => {
      console.log("hello");
      this.messages.push(message);
    })
  }
}