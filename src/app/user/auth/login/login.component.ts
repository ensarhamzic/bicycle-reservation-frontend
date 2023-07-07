import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AuthService } from 'src/app/services/auth.service';
import { googleAuth, login } from 'src/app/state/auth/auth.actions';
import { SocialAuthService } from '@abacritt/angularx-social-login';

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
  googleData: any = {};

  constructor(
    private store: Store<AppState>,
    private authService: SocialAuthService
  ) {
    this.form = new FormGroup({
      username: this.email,
      password: this.password,
    });
    this.authService.authState.subscribe((user) => {
      if(user !== null){
        this.googleData = user;
        console.log(this.googleData);
        this.store.dispatch(googleAuth(this.googleData));
        this.googleData = null;
      }
    });
  }

  // ngOnInit() {
  //   this.authService.authState.subscribe((user) => {
  //     this.googleData = user;
  //     console.log(this.googleData);
  //     this.store.dispatch(googleAuth(this.googleData));
  //     this.googleData = null
  //   });
  // }

  signOut(): void {
    this.authService.signOut();
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
