import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListacitaPageRoutingModule } from './listacita-routing.module';

import { ListacitaPage } from './listacita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListacitaPageRoutingModule
  ],
  declarations: [ListacitaPage]
})
export class ListacitaPageModule {}
