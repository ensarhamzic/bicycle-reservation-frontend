import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { StationService } from 'src/app/services/station.service';
import { BicycleType } from 'src/app/shared/enums/bicycle-type.enum';
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
  bicyleTypes = Object.values(BicycleType);

  loading: boolean = false;
  error: string = '';

  form: FormGroup = new FormGroup({});
  id: FormControl = new FormControl('', [Validators.required]);
  name: FormControl = new FormControl('', [Validators.required]);
  type: FormControl = new FormControl(BicycleType.Mountain, [
    Validators.required,
  ]);

  addBicycleMode = false;

  constructor(
    public dialogRef: MatDialogRef<StationAdminDialogComponent>,
    private stationService: StationService,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) stationId: number
  ) {
    this.form = new FormGroup({
      id: this.id,
      name: this.name,
      type: this.type,
    });

    this.stationService.getStation(stationId).subscribe((data) => {
      this.station = data.station;
      this.bicycles = data.bicycles;
    });
  }

  addBicycle = () => {
    if (this.form.invalid || !this.station) return;
    this.loading = true;
    this.adminService.addBicycle(this.station.id, this.form.value).subscribe({
      next: (data) => {
        this.bicycles.push(data);
        this.form.reset();
        this.type.setValue(BicycleType.Mountain);
        this.addBicycleMode = false;
        this.error = '';
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error.error;
        this.loading = false;
      },
    });
  };

  get idError() {
    if (this.id.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  get nameError() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.name.hasError('minlength')) {
      return 'Lock code must be at least 4 characters long';
    }
    return '';
  }

  get typeError() {
    if (this.type.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
}
