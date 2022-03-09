import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { McitaPage } from './mcita.page';

const routes: Routes = [
  {
    path: '',
    component: McitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class McitaPageRoutingModule {}
