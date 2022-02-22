import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CpersonaPage } from './cpersona.page';

const routes: Routes = [
  {
    path: '',
    component: CpersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CpersonaPageRoutingModule {}
