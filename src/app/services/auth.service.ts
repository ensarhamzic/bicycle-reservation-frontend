import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth } from '../shared/models/auth.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register = (data: any): Observable<IAuth> => {
    return this.http.post<IAuth>(`${environment.apiUrl}/auth/register`, data);
  };

  login = (username: string, password: string): Observable<IAuth> => {
    return this.http.post<IAuth>(`${environment.apiUrl}/auth/login`, {
      username,
      password,
    });
  };

  checktoken = (token: string): Observable<IAuth> => {
    return this.http.post<IAuth>(`${environment.apiUrl}/auth/check`, { token });
  };
}
