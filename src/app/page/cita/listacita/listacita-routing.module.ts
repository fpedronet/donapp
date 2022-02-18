import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListacitaPage } from './listacita.page';

const routes: Routes = [
  {
    path: '',
    component: ListacitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListacitaPageRoutingModule {}
