import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LcitaPage } from './lcita.page';

const routes: Routes = [
  {
    path: '',
    component: LcitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LcitaPageRoutingModule {}
