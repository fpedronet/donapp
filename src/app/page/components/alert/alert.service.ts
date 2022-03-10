import { Injectable } from '@angular/core';
import { AlertController  } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController : AlertController 
  ) { }

  icons: string;
  color: string;

  async showNotification(header:string, message: string, cancelText: string = 'No', okText: string = 'Sí') {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: 'basic-alert',
        header: header,
        message: message,
        animated: true,
        buttons: [
          {
            //icon: 'close-circle-outline',
            text: cancelText,
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
              resolve('cancel');
            }
          },
          {
            //icon: 'close-circle-outline',
            text: okText,
            role: 'ok',
            handler: () => {
              console.log('Ok clicked');
              resolve('ok');
            }
          }
        ]
      });
      await alert.present();
    });
  }
}
