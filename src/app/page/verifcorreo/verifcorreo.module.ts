import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifcorreoPageRoutingModule } from './verifcorreo-routing.module';

import { VerifcorreoPage } from './verifcorreo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifcorreoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VerifcorreoPage]
})
export class VerifcorreoPageModule {}
