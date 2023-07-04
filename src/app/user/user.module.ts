import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { AuthModule } from './auth/auth.module';
import { OptionsModule } from './options/options.module';
import { AddStationComponent } from './admin/add-station/add-station.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StationAdminDialogComponent } from './admin/station-admin-dialog/station-admin-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StationClientDialogComponent } from './client/station-client-dialog/station-client-dialog.component';

@NgModule({
  declarations: [AddStationComponent, StationAdminDialogComponent, StationClientDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    AuthModule,
    OptionsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  exports: [AddStationComponent],
})
export class UserModule {}
