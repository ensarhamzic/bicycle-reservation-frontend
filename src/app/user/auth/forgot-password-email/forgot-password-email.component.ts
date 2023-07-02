import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forgotPasswordEmail } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.css']
})
export class ForgotPasswordEmailComponent {

  form: FormGroup = new FormGroup({});
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private store: Store<AppState>) {
    this.form = new FormGroup({
      username: this.email,
    });
  }

  get emailError() {
    if (this.email.hasError('required')) return 'Username is required';
    if (this.email.hasError('email')) return 'Username must be an email';
    return '';
  }

  verify(){
    if(this.form.invalid) return;
    this.store.dispatch(forgotPasswordEmail({email: this.email.value as string}));
  }

  loading$ = this.store.select((state) => state.auth.loading);
  error$ = this.store.select((state) => state.auth.error);
}
