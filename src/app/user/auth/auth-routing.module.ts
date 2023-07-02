import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { ForgotPasswordEmailComponent } from './forgot-password-email/forgot-password-email.component';
import { ForgotPasswordResetComponent } from './forgot-password-reset/forgot-password-reset.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordEmailComponent,
  },
  {
    path: 'reset-password',
    component: ForgotPasswordResetComponent,
  },
  {
    path: 'verify',
    component: VerifyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
