import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({});
  username: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  constructor(private authService: AuthService) {
    this.form = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }

  login() {
    if (this.form.invalid) return;
    this.authService.login(this.username.value, this.password.value);
  }

  get usernameError() {
    if (this.username.hasError('required')) return 'Username is required';
    return '';
  }

  get passwordError() {
    if (this.password.hasError('required')) return 'Password is required';
    if (this.password.hasError('minlength'))
      return 'Password must be at least 8 characters long';
    return '';
  }
}
