import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const loggedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  store
    .select((state: AppState) => state.auth.loggedIn)
    .subscribe((loggedIn) => {
      if (!loggedIn) {
        router.navigate(['/']);
      }
    });
  return true;
};
