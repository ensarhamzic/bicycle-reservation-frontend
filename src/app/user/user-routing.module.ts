import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './options/users-page/users-page.component';
import { loggedInGuard } from '../guards/logged-in.guard';
import { DepositComponent } from './options/deposit/deposit.component';
import { isClientGuard } from '../guards/is-client.guard';
import { MyRentsComponent } from './client/my-rents/my-rents.component';

const routes: Routes = [
  {
    path: 'userInfo',
    component: UsersPageComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'deposit',
    component: DepositComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'my-rents',
    component: MyRentsComponent,
    canActivate: [isClientGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
