import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './user/auth/auth-routing.module';
import { MapComponent } from './map/map/map.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
