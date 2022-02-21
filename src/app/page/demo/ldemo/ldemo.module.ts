import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LdemoPageRoutingModule } from './ldemo-routing.module';

import { LdemoPage } from './ldemo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LdemoPageRoutingModule
  ],
  declarations: [LdemoPage]
})
export class LdemoPageModule {}
