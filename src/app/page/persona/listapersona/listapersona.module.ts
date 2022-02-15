import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListapersonaPageRoutingModule } from './listapersona-routing.module';

import { ListapersonaPage } from './listapersona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListapersonaPageRoutingModule
  ],
  declarations: [ListapersonaPage]
})
export class ListapersonaPageModule {}
