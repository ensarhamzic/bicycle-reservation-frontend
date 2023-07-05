import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  token$ = this.store.select((state) => state.auth.token);
  token = '';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.token$.subscribe((token) => {
      this.token = token;
    });
  }

  getStationStatistics = (
    stationId: number
  ): Observable<{
    arrivals: number;
    departures: number;
    bicycles: number;
    breakdowns: number;
  }> => {
    return this.http.get<{
      arrivals: number;
      departures: number;
      bicycles: number;
      breakdowns: number;
    }>(`${environment.apiUrl}/manager/station/${stationId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  };

  getBicycleStatistics = (
    bicycleId: string
  ): Observable<{
    rents: number;
    hoursRented: number;
    creditsSpent: number;
    timesServiced: number;
    timesRepaired: number;
  }> => {
    return this.http.get<{
      rents: number;
      hoursRented: number;
      creditsSpent: number;
      timesServiced: number;
      timesRepaired: number;
    }>(`${environment.apiUrl}/manager/bicycle/${bicycleId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  };

  getOverallStatistics = (): Observable<{
    stations: number;
    bicycles: number;
    rents: number;
    hoursRented: number;
    creditsSpent: number;
  }> => {
    return this.http.get<{
      stations: number;
      bicycles: number;
      rents: number;
      hoursRented: number;
      creditsSpent: number;
    }>(`${environment.apiUrl}/manager/statistics`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  };
}
