import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearpersonaPageRoutingModule } from './crearpersona-routing.module';

import { CrearpersonaPage } from './crearpersona.page';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearpersonaPageRoutingModule,
    ReactiveFormsModule   ,
    SharedModule    
  ],
  declarations: [CrearpersonaPage]
})
export class CrearpersonaPageModule {}
