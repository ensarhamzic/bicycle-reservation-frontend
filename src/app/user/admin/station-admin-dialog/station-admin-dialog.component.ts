import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StationService } from 'src/app/services/station.service';
import { IBicycle } from 'src/app/shared/models/bicycle.model';
import { IStation } from 'src/app/shared/models/station.model';

@Component({
  selector: 'app-station-admin-dialog',
  templateUrl: './station-admin-dialog.component.html',
  styleUrls: ['./station-admin-dialog.component.css'],
})
export class StationAdminDialogComponent {
  station?: IStation;
  bicycles: IBicycle[] = [];

  constructor(
    public dialogRef: MatDialogRef<StationAdminDialogComponent>,
    private stationService: StationService,
    @Inject(MAT_DIALOG_DATA) data: number
  ) {
    this.stationService.getStation(data).subscribe((data) => {
      this.station = data.station;
      this.bicycles = data.bicycles;
    });
  }
}
