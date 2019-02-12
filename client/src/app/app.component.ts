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


  constructor() {}

  //subscribe to the getMessage observable 
}
