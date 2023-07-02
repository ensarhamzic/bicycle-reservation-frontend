import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {
  register,
  login,
  authSuccess,
  authFailure,
  checkToken,
  logout,
} from './auth.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      switchMap((userData) => {
        return this.authService.register(userData).pipe(
          map((data) => authSuccess({ data })),
          tap(() => {
            this.toastr.success('Registration successful');
            this.router.navigate(['/login']);
          }),
          catchError(({ error }) => of(authFailure({ error: error.error })))
        );
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) => {
        return this.authService.login(email, password).pipe(
          map((data) => authSuccess({ data })),
          catchError(({ error }) => of(authFailure({ error: error.error })))
        );
      })
    );
  });

  checkToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkToken),
      switchMap(({ token }) => {
        return this.authService.checktoken(token).pipe(
          map((data) => authSuccess({ data })),
          catchError(() => of(logout()))
        );
      })
    );
  });
}
