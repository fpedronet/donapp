import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearpersonaPage } from './crearpersona.page';

const routes: Routes = [
  {
    path: '',
    component: CrearpersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearpersonaPageRoutingModule {}
