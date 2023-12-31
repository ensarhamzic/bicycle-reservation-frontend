import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { checkToken } from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  token = localStorage.getItem('token') || '';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.token && this.store.dispatch(checkToken({ token: this.token }));
  }
}
