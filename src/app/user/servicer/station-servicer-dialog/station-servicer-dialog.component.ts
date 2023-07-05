import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ServicerService } from 'src/app/services/servicer.service';
import { StationService } from 'src/app/services/station.service';
import { IBicycle } from 'src/app/shared/models/bicycle.model';
import { IStation } from 'src/app/shared/models/station.model';

@Component({
  selector: 'app-station-servicer-dialog',
  templateUrl: './station-servicer-dialog.component.html',
  styleUrls: ['./station-servicer-dialog.component.css'],
})
export class StationServicerDialogComponent {
  station?: IStation;
  bicycles: IBicycle[] = [];
  hasRentedBike: boolean = false;

  allStations: IStation[] = [];

  movingBicyclesIds: string[] = [];

  selectedBicycleId: string | null = null;
  movingBike: boolean = false;

  toppings = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<StationServicerDialogComponent>,
    private stationService: StationService,
    private servicerService: ServicerService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) stationId: number
  ) {
    this.stationService.getStation(stationId).subscribe((data) => {
      this.station = data.station;
      this.bicycles = data.bicycles;
      this.hasRentedBike = data.hasRentedBike;
    });

    this.stationService.getStations().subscribe((data) => {
      this.allStations = data.filter((station) => station.id !== stationId);
    });
  }

  movingProcess() {
    this.movingBike = !this.movingBike;
  }

  onCheckboxChange(event: any) {
    if (!this.movingBicyclesIds.includes(event.target.value)) {
      this.movingBicyclesIds.push(event.target.value);
    } else {
      this.movingBicyclesIds = this.movingBicyclesIds.filter(
        (id) => id !== event.target.value
      );
    }
  }

  proba() {
    this.servicerService
      .moveBicycles(this.movingBicyclesIds, parseInt(this.toppings.value!))
      .subscribe((data) => {
        this.toastr.success('Bicycles moved successfully!');
        this.dialogRef.close();
      });
  }
}
