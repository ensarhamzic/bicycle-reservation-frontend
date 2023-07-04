import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './options/users-page/users-page.component';
import { loggedInGuard } from '../guards/logged-in.guard';
import { DepositComponent } from './options/deposit/deposit.component';
import { AdminTabComponent } from './admin/admin-tab/admin-tab.component';
import { isAdmin } from '../guards/isAdmin.guard';

const routes: Routes = [
  {
    path: 'userInfo',
    component: UsersPageComponent,
    canActivate: [loggedInGuard]
  },
  {
    path: 'deposit',
    component: DepositComponent,
    canActivate: [loggedInGuard]
  },
  {
    path: 'adminTab',
    component: AdminTabComponent,
    canActivate: [isAdmin]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
