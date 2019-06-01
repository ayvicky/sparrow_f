import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  }

}
