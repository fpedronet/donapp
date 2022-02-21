import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CdemoPage } from './cdemo.page';

const routes: Routes = [
  {
    path: '',
    component: CdemoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CdemoPageRoutingModule {}
