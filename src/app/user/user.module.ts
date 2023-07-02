import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthModule } from './auth/auth.module';
import { AddStationComponent } from './admin/add-station/add-station.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AddStationComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    AuthModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [AddStationComponent],
})
export class UserModule {}
