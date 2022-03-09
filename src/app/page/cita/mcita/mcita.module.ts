import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { McitaPageRoutingModule } from './mcita-routing.module';

import { McitaPage } from './mcita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    McitaPageRoutingModule
  ],
  declarations: [McitaPage]
})
export class McitaPageModule {}
