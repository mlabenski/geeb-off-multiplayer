import { Component } from '@angular/core';

//import and use the service for chat, then in constructor also
import { ChatService } from '../chat.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geeb-off';
  message : string;
  messages: string[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
    console.log("hello");
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
