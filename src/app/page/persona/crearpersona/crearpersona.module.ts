import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearpersonaPageRoutingModule } from './crearpersona-routing.module';

import { CrearpersonaPage } from './crearpersona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearpersonaPageRoutingModule,
    ReactiveFormsModule   
  ],
  declarations: [CrearpersonaPage]
})
export class CrearpersonaPageModule {}
