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
    console.log(data);
    return this.http.post<IAuth>(`${environment.apiUrl}/Auth/register`, data);
  };

  login = (email: string, password: string): Observable<IAuth> => {
    return this.http.post<IAuth>(`${environment.apiUrl}/auth/login`, {
      email,
      password,
    });
  };

  checktoken = (token: string): Observable<IAuth> => {
    return this.http.post<IAuth>(`${environment.apiUrl}/auth/check`, { token });
  };

  verify = (token: string, email: string): Observable<IAuth> => {
    return this.http.post<IAuth>(`${environment.apiUrl}/auth/verify`, {
      token,
      email,
    });
  }

  resendVerifyEmail = (email: string): Observable<any> => {
    return this.http.post<any>(`${environment.apiUrl}/Auth/resend-verification-token`, { email });
  }

  forgotPasswordEmail = (email: string): Observable<any> => {
    return this.http.post<any>(`${environment.apiUrl}/Auth/forgot-password`, { email });
  }

  forgotPasswordReset = (token: string, password: string, email: string): Observable<any> => {
    return this.http.post<any>(`${environment.apiUrl}/Auth/reset-password`, { token, password, email });
  }
}
