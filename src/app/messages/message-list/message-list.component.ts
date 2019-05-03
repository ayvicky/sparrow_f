import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
     this.messageService.GetAll().subscribe( data => {
       console.log(data);
    //  this.messages = data.messages;
    });
  }

}
