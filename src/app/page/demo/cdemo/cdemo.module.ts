import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CdemoPageRoutingModule } from './cdemo-routing.module';

import { CdemoPage } from './cdemo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CdemoPageRoutingModule
  ],
  declarations: [CdemoPage]
})
export class CdemoPageModule {}
