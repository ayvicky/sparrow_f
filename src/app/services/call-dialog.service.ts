import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { MediaCallComponent } from 'src/app/messages/media-call/media-call.component';

@Injectable({
  providedIn: 'root'
})
export class CallDialogService {

  constructor(public dialog: MatDialog) { }


  showDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(MediaCallComponent, dialogConfig);
    /*
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    //  this.animal = result;
    });
    */
  }

}
