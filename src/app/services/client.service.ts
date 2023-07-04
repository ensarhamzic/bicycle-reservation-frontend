import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { IRecord } from '../shared/models/record.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  token$ = this.store.select((state) => state.auth.token);
  token = '';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.token$.subscribe((token) => {
      this.token = token;
    });
  }

  rentBicycle(data: {
    bicycleId: string;
    numberOfHours: number;
  }): Observable<{ lockCode: string; cost: number; balance: number }> {
    return this.http.post<{ lockCode: string; cost: number; balance: number }>(
      `${environment.apiUrl}/client/rent`,
      data,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  returnBicycle(stationId: number): Observable<string> {
    return this.http.post<string>(
      `${environment.apiUrl}/client/return`,
      {
        stationId,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  getRents(): Observable<IRecord[]> {
    return this.http.get<IRecord[]>(`${environment.apiUrl}/client/rented`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
