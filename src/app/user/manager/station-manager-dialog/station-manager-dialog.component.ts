import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManagerService } from 'src/app/services/manager.service';
import { StationService } from 'src/app/services/station.service';
import { IBicycle } from 'src/app/shared/models/bicycle.model';
import { IStation } from 'src/app/shared/models/station.model';

@Component({
  selector: 'app-station-manager-dialog',
  templateUrl: './station-manager-dialog.component.html',
  styleUrls: ['./station-manager-dialog.component.css'],
})
export class StationManagerDialogComponent {
  station?: IStation;
  bicycles: IBicycle[] = [];

  bicycleDetails: {
    rents: number;
    hoursRented: number;
    creditsSpent: number;
    timesServiced: number;
    timesRepaired: number;
  } | null = null;

  bicycleDetailsLoading = false;

  stationDetails: {
    arrivals: number;
    departures: number;
    bicycles: number;
    breakdowns: number;
  } | null = null;

  constructor(
    public dialogRef: MatDialogRef<StationManagerDialogComponent>,
    private stationService: StationService,
    private managerService: ManagerService,
    @Inject(MAT_DIALOG_DATA) stationId: number
  ) {
    this.stationService.getStation(stationId).subscribe((data) => {
      this.station = data.station;
      this.bicycles = data.bicycles;
    });

    this.managerService.getStationStatistics(stationId).subscribe((data) => {
      this.stationDetails = data;
    });
  }

  openBicycleDetails = (bicycleId: string) => {
    this.bicycleDetailsLoading = true;
    this.managerService.getBicycleStatistics(bicycleId).subscribe((data) => {
      this.bicycleDetails = data;
      this.bicycleDetailsLoading = false;
    });
  };
}
