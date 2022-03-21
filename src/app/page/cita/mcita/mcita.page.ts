import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import jsonTipoCita from 'src/assets/json/listacita.json';
import jsonTipoDonacion from 'src/assets/json/listadonacion.json';
import jsonEstado from 'src/assets/json/listaestado.json';

import { TipoCita } from 'src/app/_model/tipocita';
import { TipoDonacion } from 'src/app/_model/tipodonacion';
import { Estado } from 'src/app/_model/estado';

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
  listaEstados: Estado[] = [];
  @Input() selectTipoCita: number[] = [];
  @Input() selectTipoDonacion: number[] = [];
  @Input() selectEstado: number[] = [];

  ngOnInit() {
    this.listartipocita();
    this.listartipodonacion();
    this.listarestado();
  }

  
  listartipocita(){
    this.listaTipoCitas = [];

    for(var i in jsonTipoCita) {
      let tipo: TipoCita = {};

      tipo.nIdTipoCita = jsonTipoCita[i].nIdTipoCita;
      tipo.vDescripcion = jsonTipoCita[i].vDescripcion;
      tipo.visual = jsonTipoCita[i].visual;
      tipo.isChecked = this.selectTipoCita.includes(tipo.nIdTipoCita);

      if(tipo.visual)
        this.listaTipoCitas.push(tipo);
    }
  }

  listartipodonacion(){
    this.listaTipoDonaciones = [];

    for(var i in jsonTipoDonacion) {
      let tipo: TipoDonacion = {};

      tipo.nIdTipoDonacion = jsonTipoDonacion[i].nIdTipoDonacion;
      tipo.vDescripcion = jsonTipoDonacion[i].vDescripcion;
      tipo.visual = jsonTipoDonacion[i].visual;
      tipo.isChecked = this.selectTipoDonacion.includes(tipo.nIdTipoDonacion);

      if(tipo.visual)
        this.listaTipoDonaciones.push(tipo);
    }
  }

  listarestado(){
    this.listaEstados = [];

    for(var i in jsonEstado) {
      let estado: Estado = {};

      estado.nIdEstado = jsonEstado[i].nIdEstado;
      estado.vDescripcion = jsonEstado[i].vDescripcion;
      estado.vDetalle = jsonEstado[i].vDetalle;
      estado.vMensaje = jsonEstado[i].vMensaje;

      estado.icon = jsonEstado[i].icon;
      estado.color = jsonEstado[i].color;
      estado.visual = jsonEstado[i].visual;
      estado.isChecked = this.selectEstado.includes(estado.nIdEstado);

      this.listaEstados.push(estado);
    }
  }

  get filtrarEstadosHistorial() {
    return this.listaEstados.filter(e => e.nIdEstado >= 4);
  }

  get filtrarCancelado() {
    return this.listaEstados.find(e => e.nIdEstado === 3);
  }

  changeListCita(e: any){
    //debugger;
    /*var count = this.listaTipoCitas.filter(e => e.isChecked).length;
    if(!e.checked && count<1){
      console.log('Debe haber al menos uno seleccionado');
      e.checked = true;
    }*/
  }

  buscar(){
    //Tipos de cita seleccionados
    this.selectTipoCita = [];
    this.listaTipoCitas.forEach(tipo => {
      if(tipo.isChecked){
        this.selectTipoCita.push(tipo.nIdTipoCita);
      }
    });

    //Tipos de donación seleccionados
    this.selectTipoDonacion = [];
    this.listaTipoDonaciones.forEach(tipo => {
      if(tipo.isChecked){
        this.selectTipoDonacion.push(tipo.nIdTipoDonacion);
      }
    });

    //Tipos de donación seleccionados
    this.selectEstado = [];
    this.listaEstados.forEach(tipo => {
      if(tipo.isChecked){
        this.selectEstado.push(tipo.nIdEstado);
      }
    });

    this.modalCtrl.dismiss({
      arrayTipoCita:this.selectTipoCita,
      arrayTipoDonacion:this.selectTipoDonacion,
      arrayEstado:this.selectEstado
    });
  }

  salir(){
    this.modalCtrl.dismiss({});
  }
}
