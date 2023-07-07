import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const isGoogle: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  store
    .select((state: AppState) => state.auth.user.isGoogle)
    .subscribe((role) => {
      if (role) {
        router.navigate(['/']);
      }
    });
  return true;
};
