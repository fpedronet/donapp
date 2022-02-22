import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LpersonaPageRoutingModule } from './lpersona-routing.module';

import { LpersonaPage } from './lpersona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LpersonaPageRoutingModule
  ],
  declarations: [LpersonaPage]
})
export class LpersonaPageModule {}
