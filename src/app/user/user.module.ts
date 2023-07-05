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
import { MyRentsComponent } from './client/my-rents/my-rents.component';
import { AdminTabComponent } from './admin/admin-tab/admin-tab.component';
import { ServicerTabComponent } from './servicer/servicer-tab/servicer-tab.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BreakdownTabComponent } from './servicer/breakdown-tab/breakdown-tab.component';
import { ServiceTabComponent } from './servicer/service-tab/service-tab.component';
import { StationManagerDialogComponent } from './manager/station-manager-dialog/station-manager-dialog.component';
import { StationServicerDialogComponent } from './servicer/station-servicer-dialog/station-servicer-dialog.component';

import { StatisticsComponent } from './manager/statistics/statistics.component';

@NgModule({
  declarations: [
    AddStationComponent,
    StationAdminDialogComponent,
    StationClientDialogComponent,
    MyRentsComponent,
    AdminTabComponent,
    ServicerTabComponent,
    BreakdownTabComponent,
    ServiceTabComponent,
    StationManagerDialogComponent,
    StationServicerDialogComponent,
    StatisticsComponent,
  ],
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
    MatTabsModule,
  ],
  exports: [AddStationComponent],
})
export class UserModule {}
