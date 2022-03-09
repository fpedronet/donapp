import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import jsonTipoCita from 'src/assets/json/listacita.json';
import jsonTipoDonacion from 'src/assets/json/listadonacion.json';

import { TipoCita } from 'src/app/_model/tipocita';
import { TipoDonacion } from 'src/app/_model/tipodonacion';

@Component({
  selector: 'app-mcita',
  templateUrl: './mcita.page.html',
  styleUrls: ['./mcita.page.scss'],
})
export class McitaPage implements OnInit {
  
  constructor(
    private modalCtrl: ModalController
  ) { }

  listaTipoCitas: TipoCita[] = [];
  listaTipoDonaciones: TipoDonacion[] = [];
  @Input() selectTipoCita: number[] = [];
  @Input() selectTipoDonacion: number[] = [];

  ngOnInit() {
    this.listartipocita();
    this.listartipodonacion();
  }

  
  listartipocita(){
    this.listaTipoCitas = [];

    for(var i in jsonTipoCita) {
      let tipo: TipoCita = {};

      tipo.nIdTipoCita = jsonTipoCita[i].nIdTipoCita;
      tipo.vDescripcion = jsonTipoCita[i].vDescripcion;

      this.listaTipoCitas.push(tipo);
    }
  }

  listartipodonacion(){
    this.listaTipoDonaciones = [];

    for(var i in jsonTipoDonacion) {
      let tipo: TipoDonacion = {};

      tipo.nIdTipoDonacion = jsonTipoDonacion[i].nIdTipoDonacion;
      tipo.vDescripcion = jsonTipoDonacion[i].vDescripcion;

      this.listaTipoDonaciones.push(tipo);
    }
  }

  buscar(){
    this.modalCtrl.dismiss({
      arrayTipoCita:this.selectTipoCita,
      arrayTipoDonacion:this.selectTipoDonacion
    });
  }

  salir(){
    this.modalCtrl.dismiss();
  }
}
