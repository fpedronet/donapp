import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  icons: string;
  color: string;

  async showNotification(tipo:number,title:string, message: string) {

    if(tipo==0){
      this.icons = "close-circle-outline";
      this.color = "danger";
    }
    else if(tipo==1){
      this.icons = "checkmark-outline";
      this.color = "success";
    }
    else if(tipo==2){
      this.icons = "alert-outline";
      this.color = "warning";
    }

    const toast = await this.toastController.create({
      message: message,
      icon:  this.icons,
      duration: 3000,
      color: this.color,
      position: 'top',
      animated: true,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();
  }
}
