import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LpersonaPage } from './lpersona.page';

const routes: Routes = [
  {
    path: '',
    component: LpersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LpersonaPageRoutingModule {}
