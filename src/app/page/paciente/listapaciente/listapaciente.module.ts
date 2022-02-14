import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListapacientePageRoutingModule } from './listapaciente-routing.module';

import { ListapacientePage } from './listapaciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListapacientePageRoutingModule
  ],
  declarations: [ListapacientePage]
})
export class ListapacientePageModule {}
