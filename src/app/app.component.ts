import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { logout } from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loggedIn$ = this.store.select((state) => state.auth.loggedIn);

  constructor(private store: Store<AppState>) {}
}
