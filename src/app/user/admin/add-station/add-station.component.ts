import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css'],
})
export class AddStationComponent {
  form: FormGroup = new FormGroup({});
  name: FormControl = new FormControl('', Validators.required);

  lat: number = 0;
  lng: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AddStationComponent>,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) data: { lat: number; lng: number }
  ) {
    this.form = new FormGroup({
      name: this.name,
    });
    this.lat = data.lat;
    this.lng = data.lng;
  }

  get nameError() {
    if (this.name.hasError('required')) {
      return 'Name is required';
    }
    return '';
  }

  addStation() {
    if (this.form.invalid) return;
    const formData = {
      name: this.name.value,
      lat: this.lat,
      lng: this.lng,
    };
    this.adminService.addStation(formData).subscribe((data) => {
      this.dialogRef.close(data);
    });
  }
}
