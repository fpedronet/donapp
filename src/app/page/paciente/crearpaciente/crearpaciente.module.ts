import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearpacientePageRoutingModule } from './crearpaciente-routing.module';

import { CrearpacientePage } from './crearpaciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearpacientePageRoutingModule
  ],
  declarations: [CrearpacientePage]
})
export class CrearpacientePageModule {}
