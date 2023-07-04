import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';
import { StationService } from 'src/app/services/station.service';
import { IBicycle } from 'src/app/shared/models/bicycle.model';
import { IStation } from 'src/app/shared/models/station.model';
import { AppState } from 'src/app/state/app.state';
import { rentBicycleSuccess } from 'src/app/state/user/user.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-station-client-dialog',
  templateUrl: './station-client-dialog.component.html',
  styleUrls: ['./station-client-dialog.component.css'],
})
export class StationClientDialogComponent {
  station?: IStation;
  bicycles: IBicycle[] = [];
  hasRentedBike: boolean = false;

  selectedBicycleId: string | null = null;
  rentingBike: boolean = false;

  rentBikeForm: FormGroup = new FormGroup({});
  numberOfHours: FormControl = new FormControl(1, [
    Validators.required,
    Validators.min(1),
    Validators.max(24),
  ]);

  userCredits$ = this.store.select((state) => state.auth.user.credits);
  userCredits = 0;

  constructor(
    public dialogRef: MatDialogRef<StationClientDialogComponent>,
    private stationService: StationService,
    private clientService: ClientService,
    private store: Store<AppState>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) stationId: number
  ) {
    this.stationService.getStation(stationId).subscribe((data) => {
      this.station = data.station;
      this.bicycles = data.bicycles;
      this.hasRentedBike = data.hasRentedBike;
    });

    this.rentBikeForm = new FormGroup({
      numberOfHours: this.numberOfHours,
    });

    this.userCredits$.subscribe((credits) => {
      this.userCredits = credits;
    });
  }

  enterRentMode(bicycleId: string) {
    this.selectedBicycleId = bicycleId;
  }

  rentBicyle() {
    if (!this.selectedBicycleId) return;
    if (
      environment.rentHourPrice * this.numberOfHours.value >
      this.userCredits
    ) {
      this.toastr.error('You do not have enough credits to rent this bicycle');
      return;
    }
    this.rentingBike = true;
    const data = {
      bicycleId: this.selectedBicycleId,
      numberOfHours: this.numberOfHours.value,
    };
    this.clientService.rentBicycle(data).subscribe({
      next: (data) => {
        // prikazi kredite, lock code i update bicycles i hasRentedBike

        this.store.dispatch(rentBicycleSuccess({ balance: data.balance }));
        this.toastr.success(
          `You have successfully rented a bicycle. Lock code: ${data.lockCode}. Credits left: ${data.balance}`
        );
        this.rentingBike = false;
        this.dialogRef.close();
      },
      error: (err) => {
        this.toastr.error(err.error.error);
        this.rentingBike = false;
        this.dialogRef.close();
      },
    });
  }

  get numberOfHoursError() {
    if (this.numberOfHours.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.numberOfHours.hasError('min')) {
      return 'You must enter a value greater than 0';
    }

    return '';
  }
}
