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
  verify,
  forgotPasswordEmailSuccess,
  forgotPasswordEmail,
  forgotPasswordEmailFailure,
  forgotPasswordReset,
  resendVerifyEmail,
  changeUsername,
  changePassword,
  uploadImage,
  deleteImage,
  deleteAcc,
  deposit,
  googleAuth,
} from './auth.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, never } from 'rxjs';

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
          tap((data) => {
            if (data.data.user.verified) {
              this.toastr.success('Login successful');
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/verify']);
            }
          }),
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

  verify$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(verify),
      switchMap(({ token, email }) => {
        return this.authService.verify(token, email).pipe(
          map((data) => authSuccess({ data })),
          tap(() => {
            this.toastr.success('Successfully verified!');
            this.router.navigate(['/']);
          }),
          catchError(({ error }) => of(authFailure({ error: error.error })))
        );
      })
    );
  });

  forgotPasswordEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(forgotPasswordEmail),
      switchMap(({ email }) => {
        return this.authService.forgotPasswordEmail(email).pipe(
          map((data) =>
            forgotPasswordEmailSuccess({ message: 'Successfully Send!' })
          ),
          tap(() => {
            this.toastr.success('Successfully Send!');
            this.router.navigate(['/reset-password']);
          }),
          catchError(({ error }) =>
            of(forgotPasswordEmailFailure({ error: error.error }))
          )
        );
      })
    );
  });

  forgotPasswordReset$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(forgotPasswordReset),
      switchMap(({ token, password, email }) => {
        return this.authService
          .forgotPasswordReset(token, password, email)
          .pipe(
            map((data) =>
              forgotPasswordEmailSuccess({ message: 'Reset successfully!' })
            ),
            tap(() => {
              this.toastr.success('Successfully Reset!');
              this.router.navigate(['/login']);
            }),
            catchError(({ error }) =>
              of(forgotPasswordEmailFailure({ error: error.error }))
            )
          );
      })
    );
  });

  resendVerifyEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(resendVerifyEmail),
      switchMap(({ email }) =>
        this.authService.resendVerifyEmail(email).pipe(
          map((data) =>
            forgotPasswordEmailSuccess({ message: 'Reset successfully!' })
          ),
          tap(() => {
            this.toastr.success('Successfully Send!');
          }),
          catchError(({ error }) =>
            of(forgotPasswordEmailFailure({ error: error.error }))
          )
        )
      )
    );
  });

  changeUsername$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeUsername),
      switchMap(({ username }) =>
        this.authService.changeUsername(username).pipe(
          map((data) => authSuccess({ data })),
          tap(() => {
            this.toastr.success('Successfully changed username!');
          }),
          catchError(({ error }) =>
            of(forgotPasswordEmailFailure({ error: error.error }))
          )
        )
      )
    );
  });

  changePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changePassword),
      switchMap(({ oldPassword, newPassword }) =>
        this.authService.changePassword(oldPassword, newPassword).pipe(
          map((data) => authSuccess({ data })),
          tap(() => {
            this.toastr.success('Successfully changed password!');
          }),
          catchError(({ error }) =>
            of(forgotPasswordEmailFailure({ error: error.error }))
          )
        )
      )
    );
  });

  uploadImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(uploadImage),
      switchMap(({ image }) =>
        this.authService.uploadImage(image).pipe(
          map((data) => authSuccess({ data })),
          tap(() => {
            this.toastr.success('Successfully uploaded image!');
          }),
          catchError(({ error }) =>
            of(forgotPasswordEmailFailure({ error: error.error }))
          )
        )
      )
    );
  });

  deleteImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteImage),
      switchMap(() =>
        this.authService.deleteImage().pipe(
          map((data) => authSuccess({ data })),
          tap(() => {
            this.toastr.success('Successfully deleted image!');
          }),
          catchError(({ error }) =>
            of(forgotPasswordEmailFailure({ error: error.error }))
          )
        )
      )
    );
  });

  deleteAcc$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteAcc),
      switchMap(({ password }) =>
        this.authService.deleteAccount(password).pipe(
          map((data) => logout()),
          tap(() => {
            this.toastr.success('Successfully deleted account!');
            this.router.navigate(['/login']);
          }),
          catchError(({ error }) =>
            of(forgotPasswordEmailFailure({ error: error.error }))
          )
        )
      )
    );
  });

  deposit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deposit),
      switchMap(({ amount }) =>
        this.authService.deposit(amount).pipe(
          map((data) => authSuccess({ data })),
          tap(() => {
            this.toastr.success('Successfully deposited!');
          }),
          catchError(({ error }) =>
            of(forgotPasswordEmailFailure({ error: error.error }))
          )
        )
      )
    );
  });

  googleAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(googleAuth),
      switchMap((data) =>
        this.authService.googleAuth(data).pipe(
          map((data) => authSuccess({ data })),
          tap((data) => {
            if (data.data.user.verified) {
              console.log(data);
              this.toastr.success('Login successful');
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/verify']);
            }
          }),
          catchError(({ error }) => of(authFailure({ error: error.error })))
        )
      )
    );
  });
}
