import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { logout } from '../state/auth/auth.actions';
import { Router } from '@angular/router';
import { UserRole } from '../shared/types/user-role.type';
import { SocialAuthService } from '@abacritt/angularx-social-login';
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
  isGoogle$ = this.store.select((state) => state.auth.user.isGoogle)
  isGoogle: boolean = false;
  constructor(private store: Store<AppState>, private router: Router, private authService: SocialAuthService) {
    this.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    this.role$.subscribe((role) => {
      this.role = role;
    });

    this.isGoogle$.subscribe((isGoogle) => {
      this.isGoogle = isGoogle
    })
  }

  toggleNav() {
    this.hidden = !this.hidden;
  }

  logout() {
    if(this.isGoogle){
        this.authService.signOut();
    }
      this.store.dispatch(logout());
      this.router.navigate(['/login']);
  }
}
