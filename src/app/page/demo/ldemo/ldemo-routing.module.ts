import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LdemoPage } from './ldemo.page';

const routes: Routes = [
  {
    path: '',
    component: LdemoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LdemoPageRoutingModule {}
