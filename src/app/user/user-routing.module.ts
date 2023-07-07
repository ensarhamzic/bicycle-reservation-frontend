import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './options/users-page/users-page.component';
import { loggedInGuard } from '../guards/logged-in.guard';
import { DepositComponent } from './options/deposit/deposit.component';
import { isClientGuard } from '../guards/is-client.guard';
import { MyRentsComponent } from './client/my-rents/my-rents.component';
import { AdminTabComponent } from './admin/admin-tab/admin-tab.component';
import { isAdmin } from '../guards/isAdmin.guard';
import { ServicerTabComponent } from './servicer/servicer-tab/servicer-tab.component';
import { isServicer } from '../guards/isServicer.guard';
import { StatisticsComponent } from './manager/statistics/statistics.component';
import { isManager } from '../guards/is-manager.guard';
import { isGoogle } from '../guards/is-google.guard';

const routes: Routes = [
  {
    path: 'userInfo',
    component: UsersPageComponent,
    canActivate: [loggedInGuard, isGoogle],
  },
  {
    path: 'deposit',
    component: DepositComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'servicer',
    component: ServicerTabComponent,
    canActivate: [isServicer],
  },
  {
    path: 'my-rents',
    component: MyRentsComponent,
    canActivate: [isClientGuard],
  },
  {
    path: 'adminTab',
    component: AdminTabComponent,
    canActivate: [isAdmin],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [isManager],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
