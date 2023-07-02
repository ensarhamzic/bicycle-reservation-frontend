import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UserRole } from '../shared/types/user-role.type';
import { MatDialog } from '@angular/material/dialog';
import { AddStationComponent } from '../user/admin/add-station/add-station.component';
import { IStation } from '../shared/models/station.model';
import { StationService } from '../services/station.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  role$ = this.store.select((state) => state.auth.user.role);
  role: UserRole = null;

  stations: IStation[] = [];
  addStation: { lat: number; lng: number } | null = null;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private stationService: StationService
  ) {
    this.role$.subscribe((role) => {
      this.role = role;
    });

    this.stationService.getStations().subscribe((data) => {
      this.stations = data;
    });
  }

  mapClickHandler(event: google.maps.MapMouseEvent) {
    if (this.role === 'Admin' && event.latLng) {
      this.addStation = {
        lat: event.latLng.toJSON().lat,
        lng: event.latLng.toJSON().lng,
      };
      const addStationDialogRef = this.dialog.open(AddStationComponent, {
        enterAnimationDuration: 200,
        exitAnimationDuration: 200,
        data: this.addStation,
      });

      addStationDialogRef.afterClosed().subscribe((data) => {
        this.addStation = null;
        if (data) this.stations.push(data);
      });
    }
  }

  markerClickHandler(stanicaId: number) {
    console.log(stanicaId);
  }
}
