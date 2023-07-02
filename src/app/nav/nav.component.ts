import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { logout } from '../state/auth/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  hidden = true;
  loggedIn$ = this.store.select((state) => state.auth.loggedIn);
  loggedIn = false;
  constructor(private store: Store<AppState>) {
    this.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }
  toggleNav() {
    this.hidden = !this.hidden;
  }

  logout(){
    this.store.dispatch(logout());
  }
}

// const openNavButton = document.querySelector('#open-nav');
// const closeNavButton = document.querySelector('#close-nav');
// const nav = document.querySelector('nav');
// openNavButton.addEventListener('click', function () {
//   nav.classList.toggle('hide');
// });
// closeNavButton.addEventListener('click', function () {
//   nav.classList.toggle('hide');
// });
