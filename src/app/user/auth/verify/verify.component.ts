import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { resendVerifyEmail } from 'src/app/state/auth/auth.actions';
import { verify } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  form: FormGroup = new FormGroup({});
  token: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  counter = 10;
  showValue = 'Resend Token'
  disabled = false;
  email$ = this.store.select((state) => state.auth.user.email);
  email: string = ''


  constructor(private store: Store<AppState>) {
    this.form = new FormGroup({
      token: this.token,
    });
    this.email$.subscribe((email) => {
      this.email = email;
    }
    );
  }

  get tokenError() {
    if (this.token.hasError('required')) return 'Token is required';
    if (this.token.hasError('minlength')) return 'Token must be at least 6 characters';
    return '';
  }

  verify(){
    if(this.form.invalid) return;
    this.store.dispatch(verify({token: this.token.value, email: this.email as string}));
  }

  resend(){
    if(this.showValue === 'Resend Token'){
      this.disabled = true;
      this.store.dispatch(resendVerifyEmail({email: this.email as string}));
      setInterval(() => {
        this.counter = this.counter - 1;
        this.showValue = this.counter + 's';
        if(this.counter === 0){
          this.showValue = 'Resend Token';
          this.counter = 60;
          this.disabled = false;
        }
      }
      , 1000);
    }
  }

  loading$ = this.store.select((state) => state.auth.loading);
  error$ = this.store.select((state) => state.auth.error);
}
