import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { logout } from '../state/auth/auth.actions';
import { Router } from '@angular/router';
import { UserRole } from '../shared/types/user-role.type';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  hidden = true;
  role$ = this.store.select((state) => state.auth.user.role);
  role: UserRole = null;
  loggedIn$ = this.store.select((state) => state.auth.loggedIn);
  loggedIn = false;
  role$ = this.store.select((state) => state.auth.user.role);
  role: UserRole = null;
  constructor(private store: Store<AppState>, private router: Router) {
    
    this.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    this.role$.subscribe((role) => {
      this.role = role;
    });
  }

  toggleNav() {
    this.hidden = !this.hidden;
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
