import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListapacientePage } from './listapaciente.page';

const routes: Routes = [
  {
    path: '',
    component: ListapacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListapacientePageRoutingModule {}
