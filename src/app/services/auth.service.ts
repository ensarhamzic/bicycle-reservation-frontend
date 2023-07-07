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
    return this.http.get<IAuth>(`${environment.apiUrl}/auth/check-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  verify = (token: string, email: string): Observable<IAuth> => {
    return this.http.post<IAuth>(`${environment.apiUrl}/auth/verify`, {
      token,
      email,
    });
  };

  resendVerifyEmail = (email: string): Observable<any> => {
    return this.http.post<any>(
      `${environment.apiUrl}/Auth/resend-verification-token`,
      { email }
    );
  };

  forgotPasswordEmail = (email: string): Observable<any> => {
    return this.http.post<any>(`${environment.apiUrl}/Auth/forgot-password`, {
      email,
    });
  };

  forgotPasswordReset = (
    token: string,
    password: string,
    email: string
  ): Observable<any> => {
    return this.http.post<any>(`${environment.apiUrl}/Auth/reset-password`, {
      token,
      password,
      email,
    });
  };

  changePassword = (
    oldPassword: string,
    newPassword: string
  ): Observable<any> => {
    return this.http.post<any>(
      `${environment.apiUrl}/User/change-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  };

  changeUsername = (username: string): Observable<any> => {
    return this.http.post<any>(
      `${environment.apiUrl}/User/change-username`,
      {
        username,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  };

  deleteAccount = (password: string): Observable<any> => {
    return this.http.post<any>(
      `${environment.apiUrl}/User/delete-account`,
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  };

  uploadImage = (image: any): Observable<any> => {
    const formData = new FormData();
    formData.append('ProfileImage', image);
    return this.http.post<any>(
      `${environment.apiUrl}/User/upload-image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  };

  deleteImage = (): Observable<any> => {
    return this.http.delete<any>(`${environment.apiUrl}/User/delete-image`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  deposit = (amount: number): Observable<any> => {
    return this.http.post<any>(
      `${environment.apiUrl}/User/deposit-credits`,
      {
        credits: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  };

  googleAuth = (user: any): Observable<IAuth> => {
    return this.http.post<IAuth>(`${environment.apiUrl}/Auth/google-login`, {
      "email": user.email,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "imageUrl": user.imageUrl,
      "id": user.id,
      "username": user.name,
    });
  };
}

// email: string;
//     firstName: string;
//     lastName: string;
//     imageUrl: string;
//     id: string;
//     username: string;
