import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-add',
  templateUrl: './announcement-add.component.html',
  styleUrls: ['./announcement-add.component.css']
})
export class AnnouncementAddComponent implements OnInit {
  panelOpenState = false;
  eventTypes = [
    {
      name: 'Seminars and Conferences',
      value: '1'
    },
    {
      name: 'Trade Shows',
      value: '2'
    },
    {
      name: 'Executive Retreats and Incentive Programs',
      value: '3'
    },
    {
      name: 'Golf Events',
      value: '4'
    },
    {
      name: 'Appreciation Events',
      value: '5'
    },
    {
      name: 'Company or Organization Milestones',
      value: '6'
    },
    {
      name: 'Team-Building Events',
      value: '7'
    },
    {
      name: 'Product Launch Events',
      value: '8'
    },
    {
      name: 'Board Meetings and Shareholder Meetings',
      value: '9'
    },    
  ];

  durations = [
    {
      name: 'Short',
      value: '1'
    },
    {
      name: 'Medium',
      value: '2'
    },
    {
      name: 'Long',
      value: '3'
    }    
  ];
  constructor() { }

  ngOnInit() {
  }

}
