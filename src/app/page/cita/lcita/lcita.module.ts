import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LcitaPageRoutingModule } from './lcita-routing.module';

import { LcitaPage } from './lcita.page';
import { McitaPageModule } from '../mcita/mcita.module';
import { McitaPage } from '../mcita/mcita.page';

@NgModule({
  entryComponents:[
    McitaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LcitaPageRoutingModule,
    ReactiveFormsModule,
    McitaPageModule
    ],
  declarations: [LcitaPage]
})
export class LcitaPageModule {}
