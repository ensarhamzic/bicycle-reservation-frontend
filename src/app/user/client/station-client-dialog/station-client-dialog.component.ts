import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StationService } from 'src/app/services/station.service';
import { IBicycle } from 'src/app/shared/models/bicycle.model';
import { IStation } from 'src/app/shared/models/station.model';

@Component({
  selector: 'app-station-client-dialog',
  templateUrl: './station-client-dialog.component.html',
  styleUrls: ['./station-client-dialog.component.css'],
})
export class StationClientDialogComponent {
  station?: IStation;
  bicycles: IBicycle[] = [];

  constructor(
    public dialogRef: MatDialogRef<StationClientDialogComponent>,
    private stationService: StationService,
    @Inject(MAT_DIALOG_DATA) stationId: number
  ) {
    this.stationService.getStation(stationId).subscribe((data) => {
      this.station = data.station;
      this.bicycles = data.bicycles;
    });
  }
}
