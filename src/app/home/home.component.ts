import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UserRole } from '../shared/types/user-role.type';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddStationComponent } from '../user/admin/add-station/add-station.component';
import { IStation } from '../shared/models/station.model';
import { StationService } from '../services/station.service';
import { StationAdminDialogComponent } from '../user/admin/station-admin-dialog/station-admin-dialog.component';
import { StationClientDialogComponent } from '../user/client/station-client-dialog/station-client-dialog.component';
import { StationManagerDialogComponent } from '../user/manager/station-manager-dialog/station-manager-dialog.component';
import { Router } from '@angular/router';
import { StationServicerDialogComponent } from '../user/servicer/station-servicer-dialog/station-servicer-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loggedIn$ = this.store.select((state) => state.auth.loggedIn);
  loggedIn: boolean = false;
  role$ = this.store.select((state) => state.auth.user.role);
  role: UserRole = null;

  userCords: { lat: number; lng: number } = {
    lat: 0,
    lng: 0,
  };

  dialogOptions: MatDialogConfig = {
    enterAnimationDuration: 200,
    exitAnimationDuration: 200,
  };

  stations: IStation[] = [];
  addStation: { lat: number; lng: number } | null = null;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private stationService: StationService,
    private router: Router
  ) {
    this.role$.subscribe((role) => {
      this.role = role;
    });

    this.stationService.getStations().subscribe((data) => {
      this.stations = data;
    });

    this.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  ngOnInit(): void {
    this.getLocation();
  }

  mapClickHandler(event: google.maps.MapMouseEvent) {
    if (this.role === 'Admin' && event.latLng) {
      this.addStation = {
        lat: event.latLng.toJSON().lat,
        lng: event.latLng.toJSON().lng,
      };
      const addStationDialogRef = this.dialog.open(AddStationComponent, {
        ...this.dialogOptions,
        data: this.addStation,
      });

      addStationDialogRef.afterClosed().subscribe((data) => {
        this.addStation = null;
        if (data) this.stations.push(data);
      });
    }
  }

  markerClickHandler(stanicaId: number) {
    if (!this.loggedIn) this.router.navigate(['/login']);
    if (this.role === 'Admin') {
      this.dialog.open(StationAdminDialogComponent, {
        ...this.dialogOptions,
        data: stanicaId,
      });
    } else if (this.role === 'Client') {
      this.dialog.open(StationClientDialogComponent, {
        ...this.dialogOptions,
        data: stanicaId,
      });
    } else if (this.role === 'Manager') {
      this.dialog.open(StationManagerDialogComponent, {
        ...this.dialogOptions,
        data: stanicaId,
      });
    }
    else if(this.role === 'Servicer'){
      this.dialog.open(StationServicerDialogComponent,{
        ...this.dialogOptions,
        data: stanicaId
      })
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.userCords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          }
        },
        (error) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
