import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forgotPasswordReset } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.css'],
})
export class ForgotPasswordResetComponent {
  form: FormGroup = new FormGroup({});
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  confirm: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  token: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(private store: Store<AppState>, private router: Router) {
    this.form = new FormGroup({
      username: this.email,
      password: this.password,
      confirm: this.confirm,
      token: this.token,
    });
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

  get confirmError() {
    if (this.confirm.hasError('required')) return 'Confirm is required';
    if (this.confirm.hasError('minlength'))
      return 'Confirm must be at least 8 characters long';
    if (this.confirm.value != this.password.value)
      return 'Confirm must be the same as password';
    return '';
  }

  get tokenError() {
    if (this.token.hasError('required')) return 'Token is required';
    if (this.token.hasError('minlength'))
      return 'Token must be at least 6 characters long';
    return '';
  }

  reset() {
    if(this.form.invalid) return;
    this.store.dispatch(forgotPasswordReset({
      email: this.email.value,
      password: this.password.value,
      token: this.token.value,
    }));
  }

  loading$ = this.store.select((state) => state.auth.loading);
  error$ = this.store.select((state) => state.auth.error);
}
