import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CcitaPageRoutingModule } from './ccita-routing.module';

import { CcitaPage } from './ccita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CcitaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CcitaPage]
})
export class CcitaPageModule {}
