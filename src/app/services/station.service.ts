import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStation } from '../shared/models/station.model';
import { IBicycle } from '../shared/models/bicycle.model';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  constructor(private http: HttpClient) {}

  getStations(): Observable<IStation[]> {
    return this.http.get<IStation[]>(`${environment.apiUrl}/station`);
  }

  getStation(
    id: number
  ): Observable<{ station: IStation; bicycles: IBicycle[] }> {
    return this.http.get<{ station: IStation; bicycles: IBicycle[] }>(
      `${environment.apiUrl}/station/${id}`
    );
  }
}
