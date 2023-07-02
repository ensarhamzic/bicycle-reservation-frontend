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

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      switchMap((userData) => {
        return this.authService.register(userData).pipe(
          map((data) => authSuccess({ data })),
          catchError(({ error }) => of(authFailure({ error: error.error })))
        );
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(({ username, password }) => {
        return this.authService.login(username, password).pipe(
          map((data) => authSuccess({ data })),
          catchError(({ error }) => of(authFailure({ error: error.message })))
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
