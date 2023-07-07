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
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
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
    MatProgressSpinnerModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.clientId
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
})
export class AuthModule {}
