import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './options/users-page/users-page.component';
import { loggedInGuard } from '../guards/logged-in.guard';
import { DepositComponent } from './options/deposit/deposit.component';
import { MyRentedBicyleComponent } from './client/my-rented-bicyle/my-rented-bicyle.component';
import { isClientGuard } from '../guards/is-client.guard';

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
    path: 'my-rent',
    component: MyRentedBicyleComponent,
    canActivate: [isClientGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
