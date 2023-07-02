import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VerifyComponent } from './verify/verify.component';
import { ForgotPasswordEmailComponent } from './forgot-password-email/forgot-password-email.component';
import { ForgotPasswordResetComponent } from './forgot-password-reset/forgot-password-reset.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [LoginComponent, RegisterComponent, VerifyComponent, ForgotPasswordEmailComponent, ForgotPasswordResetComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
})
export class AuthModule {}
