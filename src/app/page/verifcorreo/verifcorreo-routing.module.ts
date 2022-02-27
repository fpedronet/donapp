import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifcorreoPage } from './verifcorreo.page';

const routes: Routes = [
  {
    path: '',
    component: VerifcorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifcorreoPageRoutingModule {}
