import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AuthService } from 'src/app/services/auth.service';
import { login } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({});
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  loading$ = this.store.select((state) => state.auth.loading);
  error$ = this.store.select((state) => state.auth.error);

  constructor(private store: Store<AppState>) {
    this.form = new FormGroup({
      username: this.email,
      password: this.password,
    });
  }

  login() {
    if (this.form.invalid) return;
    this.store.dispatch(
      login({ email: this.email.value, password: this.password.value })
    );
  }

  get emailError() {
    if (this.email.hasError('required')) return 'Username is required';
    if (this.email.hasError('email')) return 'Username must be an email';
    return '';
  }

  get passwordError() {
    if (this.password.hasError('required')) return 'Password is required';
    if (this.password.hasError('minlength'))
      return 'Password must be at least 8 characters long';
    return '';
  }
}
