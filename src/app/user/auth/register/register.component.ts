import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({});
  firstName: FormControl = new FormControl('', Validators.required);
  lastName: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  confirmPassword: FormControl = new FormControl('', Validators.required);
  username: FormControl = new FormControl('', Validators.required);

  constructor(private authService: AuthService) {
    this.form = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      username: this.username,
    });
  }

  register() {
    if (this.form.invalid) return;
    this.authService.register(this.form.value);
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

  get firstNameError() {
    if (this.firstName.hasError('required')) return 'First name is required';
    return '';
  }

  get lastNameError() {
    if (this.lastName.hasError('required')) return 'Last name is required';
    return '';
  }

  get emailError() {
    if (this.email.hasError('required')) return 'Email is required';
    if (this.email.hasError('email')) return 'Email is invalid';
    return '';
  }

  get confirmPasswordError() {
    if (this.confirmPassword.hasError('required'))
      return 'Confirm password is required';
    if (this.confirmPassword.value !== this.password.value) {
      this.confirmPassword.setErrors({ mismatch: true });
      return 'Passwords do not match';
    } else {
      this.confirmPassword.setErrors(null);
    }
    return '';
  }
}
