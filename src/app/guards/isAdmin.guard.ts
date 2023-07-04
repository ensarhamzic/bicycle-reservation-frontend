import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const isAdmin: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  store
    .select((state: AppState) => state.auth.user.role)
    .subscribe((role) => {
      if (role !== 'Admin') {
        router.navigate(['/']);
      }
    });
  return true;
};
