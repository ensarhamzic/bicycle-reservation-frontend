import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth } from '../shared/models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register = (data: any): Observable<IAuth> => {
    return this.http.post<IAuth>('auth/register', data);
  };

  login = (username: string, password: string): Observable<IAuth> => {
    return this.http.post<IAuth>('auth/login', { username, password });
  };

  checktoken = (token: string): Observable<IAuth> => {
    return this.http.post<IAuth>('auth/checktoken', { token });
  };
}
