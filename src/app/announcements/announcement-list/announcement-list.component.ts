import { Component, OnInit } from '@angular/core';

import { AnnouncementService } from '../../services';
import { Global } from '../../helpers/global';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit {

  announcements = [];
  storage = '';
  constructor(private announcementService: AnnouncementService) { }

  ngOnInit() {
    this.announcementService.getall().subscribe(result => {
      console.log(result);
      this.announcements = result.announcements;
    });
    this.storage = Global.STORAGE;
  }

}
