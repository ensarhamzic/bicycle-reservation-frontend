import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UserRole } from '../shared/types/user-role.type';
import { MatDialog } from '@angular/material/dialog';
import { AddStationComponent } from '../user/admin/add-station/add-station.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  role$ = this.store.select((state) => state.auth.user.role);
  role: UserRole = null;

  addStation: { lat: number; lng: number } | null = null;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.role$.subscribe((role) => {
      this.role = role;
    });
  }

  mapClickHandler(event: google.maps.MapMouseEvent) {
    // if (this.role === 'Admin' && event.latLng) {
    if (event.latLng) {
      this.addStation = {
        lat: event.latLng.toJSON().lat,
        lng: event.latLng.toJSON().lng,
      };
      this.dialog.open(AddStationComponent, {
        enterAnimationDuration: 200,
        exitAnimationDuration: 200,
      });
    }
  }

  markerClickHandler(stanicaId: number) {
    console.log(stanicaId);
  }
}
