import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { logout } from '../state/auth/auth.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  hidden = true;
  loggedIn$ = this.store.select((state) => state.auth.loggedIn);
  loggedIn = false;
  constructor(private store: Store<AppState>, private router: Router) {
    this.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }
  toggleNav() {
    this.hidden = !this.hidden;
  }

  logout(){
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
