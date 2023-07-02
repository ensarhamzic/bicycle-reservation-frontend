import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  loggedIn$ = this.store.select((state) => state.auth.loggedIn);

  hidden = true;

  constructor(private store: Store<AppState>) {}
}
