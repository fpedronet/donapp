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

  async showNotification(header:string, message: string, cancelText: string = 'No', okText: string = 'Sí', options: string[] = []) {
    return new Promise(async (resolve) => {
      var optButtons = [];
      var css = '';
      if(options === undefined || options.length === 0){
        css = 'sn-alert';
        optButtons = [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
              resolve('cancel');
            }
          },
          {
            text: okText,
            role: 'ok',
            handler: () => {
              console.log('Ok clicked');
              resolve('ok');
            }
          }
        ]
      }
      else{
        css = 'opt-alert';
        options.forEach(op => {
          let button = {
            text: op,
            role: op,
            handler: () => {
              console.log('Option ' + op + ' clicked');
              resolve(op);
            }
          }
          optButtons.push(button);
        });
      }
      const alert = await this.alertController.create({
        cssClass: css,
        header: header,
        message: message,
        animated: true,
        buttons: optButtons
      });
      await alert.present();
    });
  }
}
