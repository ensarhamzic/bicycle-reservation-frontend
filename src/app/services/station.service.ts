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
    id: number
  ): Observable<{ station: IStation; bicycles: IBicycle[] }> {
    return this.http.get<{ station: IStation; bicycles: IBicycle[] }>(
      `${environment.apiUrl}/station/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
