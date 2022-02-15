import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListapersonaPage } from './listapersona.page';

const routes: Routes = [
  {
    path: '',
    component: ListapersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListapersonaPageRoutingModule {}
