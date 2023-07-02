import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css'],
})
export class AddStationComponent {
  constructor(public dialogRef: MatDialogRef<AddStationComponent>) {}
}
