import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading:HTMLIonLoadingElement;

  constructor(
    public loadingController: LoadingController
  ) {
    // this.loading = this.loadingController
   }

  async openLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });
    await this.loading.present();
  }
  async closeLoading() {
    await this.loading.dismiss();
  }
}
