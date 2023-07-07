import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStation } from '../shared/models/station.model';
import { IBicycle } from '../shared/models/bicycle.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  token$ = this.store.select((state) => state.auth.token);
  token = '';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.token$.subscribe((token) => {
      this.token = token;
    });
  }

  getStations(): Observable<IStation[]> {
    return this.http.get<IStation[]>(`${environment.apiUrl}/station`);
  }

  getStation(
    id: number,
    bicycleType?: string | null,
    pageSize?: number | null,
    pageNumber?: number | null
  ): Observable<{
    station: IStation;
    bicycles: IBicycle[];
    hasRentedBike: boolean;
    length: number;
    pages: number;
  }> {
    console.log(pageNumber);
    let url = `${environment.apiUrl}/station/${id}?`;
    if (bicycleType) url += `bicycleType=${bicycleType}&`;

    if (pageSize) url += `pageSize=${pageSize}&`;

    if (pageNumber) url += `pageNumber=${pageNumber}`;

    if (pageNumber === 0) url += `pageNumber=${pageNumber}`;

    console.log(url);

    return this.http.get<{
      station: IStation;
      bicycles: IBicycle[];
      hasRentedBike: boolean;
      length: number;
      pages: number;
    }>(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
