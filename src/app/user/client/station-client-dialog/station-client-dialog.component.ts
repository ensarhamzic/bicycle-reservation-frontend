import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipListboxChange } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
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
  bicyclesCount: number = 0;
  pagesCount: number = 0;
  page: number = 0;
  pageSize: number = 4;
  bicycleTypeFilter: string = '';

  selectedBicycleId: string | null = null;
  actionInProgress: boolean = false;

  rentMode: boolean = false;
  reportMode: boolean = false;

  reportingBreakdown: boolean = false;

  reportBikeForm: FormGroup = new FormGroup({});
  breakdownDescription: FormControl = new FormControl('', [
    Validators.required,
  ]);

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
    this.stationService
      .getStation(stationId, null, this.pageSize, this.page)
      .subscribe((data) => {
        console.log(data);
        this.station = data.station;
        this.bicycles = data.bicycles;
        this.hasRentedBike = data.hasRentedBike;
        this.bicyclesCount = data.length;
        this.pagesCount = data.pages;
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
    this.rentMode = true;
  }

  rentModeClose() {
    this.rentMode = false;
    this.selectedBicycleId = null;
  }

  enterReportMode(bicycleId: string) {
    this.selectedBicycleId = bicycleId;
    this.reportMode = true;
  }

  reportModeClose() {
    this.reportMode = false;
    this.selectedBicycleId = null;
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
    this.actionInProgress = true;
    const data = {
      bicycleId: this.selectedBicycleId,
      numberOfHours: this.numberOfHours.value,
    };
    this.clientService.rentBicycle(data).subscribe({
      next: (data) => {
        this.store.dispatch(rentBicycleSuccess({ balance: data.balance }));
        this.toastr.success(
          `You have successfully rented a bicycle. Lock code: ${data.lockCode}. Credits left: ${data.balance}`
        );
        this.actionInProgress = false;
        this.dialogRef.close();
      },
      error: (err) => {
        this.toastr.error(err.error.error);
        this.actionInProgress = false;
        this.dialogRef.close();
      },
    });
  }

  reportBreakdown() {
    if (!this.selectedBicycleId) return;
    const data = {
      bicycleId: this.selectedBicycleId,
      description: this.breakdownDescription.value,
    };
    this.actionInProgress = true;
    this.clientService.reportBreakdown(data).subscribe({
      next: () => {
        this.toastr.success(
          `You have successfully reported breakdown on this bicycle`
        );
        this.actionInProgress = false;
        this.dialogRef.close();
      },
      error: (err) => {
        this.toastr.error(err.error.error);
        this.actionInProgress = false;
        this.dialogRef.close();
      },
    });
  }

  returnBike() {
    if (!this.station) return;
    this.clientService.returnBicycle(this.station.id).subscribe(() => {
      this.toastr.success('You have successfully returned a bicycle');
      this.dialogRef.close();
    });
  }

  filterChanged(event: MatChipListboxChange) {
    this.bicycleTypeFilter = event.value;
    this.page = 0;
    this.updateBicycles();
  }

  pageChanged(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;

    this.updateBicycles();
  }

  updateBicycles() {
    let request$ = this.stationService.getStation(
      this.station?.id!,
      null,
      this.pageSize,
      this.page
    );
    if (this.bicycleTypeFilter)
      request$ = this.stationService.getStation(
        this.station?.id!,
        this.bicycleTypeFilter,
        this.pageSize,
        this.page
      );

    request$.subscribe((data) => {
      this.bicycles = data.bicycles;
      this.bicyclesCount = data.length;
      this.pagesCount = data.pages;
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

  get breakdownDescriptionError() {
    if (this.breakdownDescription.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}
