import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LcitaPageRoutingModule } from './lcita-routing.module';

import { LcitaPage } from './lcita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LcitaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LcitaPage]
})
export class LcitaPageModule {}
