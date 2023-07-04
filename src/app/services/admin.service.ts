import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStation } from '../shared/models/station.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { IBicycle } from '../shared/models/bicycle.model';
import { IUser } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  token$ = this.store.select((state) => state.auth.token);
  token = '';

  constructor(private store: Store<AppState>, private http: HttpClient) {
    this.token$.subscribe((token) => {
      this.token = token;
    });
  }

  addStation = (data: {
    name: string;
    lat: number;
    lng: number;
  }): Observable<IStation> => {
    return this.http.post<IStation>(
      `${environment.apiUrl}/admin/stations`,
      data,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  };

  addBicycle = (
    stationId: number,
    data: {
      id: string;
      naziv: string;
      type: string;
    }
  ): Observable<IBicycle> => {
    return this.http.post<IBicycle>(
      `${environment.apiUrl}/admin/stations/${stationId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  };

  getUsers = (): Observable<IUser[]> => {
    return this.http.get<IUser[]>(`${environment.apiUrl}/admin/users`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  };

  deleteUser = (id: number): Observable<any> => {
    return this.http.delete<any>(`${environment.apiUrl}/admin/user/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  };

  promote = (userId: number, role: string): Observable<any> => {
    return this.http.post<any>(
      `${environment.apiUrl}/Admin/promote`,
      {
        userId,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  };
}
