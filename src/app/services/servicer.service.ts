import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IBreakdown } from '../shared/models/breakdown.model';
import { IService } from '../shared/models/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServicerService {
  token$ = this.store.select((state) => state.auth.token);
  token = '';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.token$.subscribe((token) => {
      this.token = token;
    });
  }

  getBreakdowns = (): Observable<IBreakdown[]> => {
    return this.http.get<IBreakdown[]>(
      `${environment.apiUrl}/Servicer/breakdowns`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  };

  resolveBreakdown = (breakdownId: number): Observable<any> => {
    return this.http.post<any>(
      `${environment.apiUrl}/Servicer/resolve`,
      {
        breakdownId,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  };

  getServices = (): Observable<IService[]> => {
    return this.http.get<IService[]>(
      `${environment.apiUrl}/Servicer/services`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  };

  addService = (bicycleId: string): Observable<any> => {
    return this.http.post<any>(
      `${environment.apiUrl}/Servicer/service`,
      {
        bicycleId,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  };
}
