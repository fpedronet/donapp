import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mcita',
  templateUrl: './mcita.page.html',
  styleUrls: ['./mcita.page.scss'],
})
export class McitaPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  salir(){
    this.modalCtrl.dismiss();
  }
}
