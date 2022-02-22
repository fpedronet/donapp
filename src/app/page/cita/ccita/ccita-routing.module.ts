import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CcitaPage } from './ccita.page';

const routes: Routes = [
  {
    path: '',
    component: CcitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CcitaPageRoutingModule {}
