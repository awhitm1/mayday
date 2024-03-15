import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogData } from '../config.component';

@Component({
  selector: 'app-config-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './config-dialog.component.html',
  styleUrl: './config-dialog.component.css'
})
export class ConfigDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('Dialog data: ', data);
  }
}
