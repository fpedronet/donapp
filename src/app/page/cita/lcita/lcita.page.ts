import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { CitaService } from 'src/app/_service/cita.service';
import { Cita, CitaRequest } from 'src/app/_model/cita';
import { McitaPage } from '../mcita/mcita.page';
import { TipoCita } from 'src/app/_model/tipocita';
import { TipoDonacion } from 'src/app/_model/tipodonacion';

import jsonTipoCita from 'src/assets/json/listacita.json';
import jsonTipoDonacion from 'src/assets/json/listadonacion.json';

@Component({
  selector: 'app-lcita',
  templateUrl: './lcita.page.html',
  styleUrls: ['./lcita.page.scss'],
})
export class LcitaPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  constructor(
    private router: Router,
    private citaService: CitaService,
    private modalCtrl: ModalController
  ) { }

  dataSource: Cita[] = [];
  dataCita: Cita[] = [];
  sinResultados: string = '';

  total: number = 0;
  totalResult: number = 0;
  data: string = "";
  page: number = 1;

  listaTipoCitas: TipoCita[] = [];
  listaTipoDonaciones: TipoDonacion[] = [];
  selectTipoCita: number[] = [];
  selectTipoDonacion: number[] = [];
  
  ngOnInit() {
    this.listartipocita();
    this.listartipodonacion();
    this.buscar();
  }
  
  loadData(event?) {
    // setTimeout(() => {

      let model = new CitaRequest;
      model.data= this.data;
      model.listaTipocita= this.selectTipoCita;
      model.listTipodonacion= this.selectTipoDonacion;
      model.page = this.page;
      model.pages= 10;

      this.citaService.listar(model).subscribe(data=>{

      this.dataSource = data.items;

        if(this.dataSource.length === 0){
          this.sinResultados = 'No se encontraron resultados';
        }

         this.dataSource.forEach(element => {          
            let model = new Cita();
  
            model.nIdCita= element.nIdCita;
            model.fechaProgramada= element.fechaProgramada;
            model.nTipoCita= element.nTipoCita;
            model.vTipoCita= element.vTipoCita;
            model.vTipoDonacion= element.vTipoDonacion;
            model.vIcon= "../../../../assets/"+element.vIcon;
            model.vBanco= element.vBanco;
            model.vCampana= element.vCampana;
  
            this.dataCita.push(model);
          });

          this.total += data.pagination.pages;
          this.totalResult = data.pagination.total;

          if(this.total >= data.pagination.total){
            this.totalResult = data.pagination.total;
            this.infiniteScroll.complete();
            this.infiniteScroll.disabled = true;
            this.page = 1;

            return false;
          }else{
            this.infiniteScroll.disabled = false;
          }
       
      });      

      // this.infiniteScroll.complete();

      this.page++;

    // }, 500);
  }

  buscar(){
    this.dataCita = [];
    this.sinResultados = '';
    this.totalResult = 0;
    this.total = 0;
    this.page=1;
    this.loadData();
  }

  listartipocita(){
    this.listaTipoCitas = [];

    for(var i in jsonTipoCita) {
      let tipo: TipoCita = {};

      tipo.nIdTipoCita = jsonTipoCita[i].nIdTipoCita;
      tipo.vDescripcion = jsonTipoCita[i].vDescripcion;

      this.listaTipoCitas.push(tipo);

      this.selectTipoCita.push(tipo.nIdTipoCita);
    }
  }

  listartipodonacion(){
    this.listaTipoDonaciones = [];

    for(var i in jsonTipoDonacion) {
      let tipo: TipoDonacion = {};

      tipo.nIdTipoDonacion = jsonTipoDonacion[i].nIdTipoDonacion;
      tipo.vDescripcion = jsonTipoDonacion[i].vDescripcion;

      this.listaTipoDonaciones.push(tipo);

      this.selectTipoDonacion.push(tipo.nIdTipoDonacion);
    }
  }

  nuevo(){
    this.router.navigate(['/ccita/create/1']);
  }

  edit(id: number, ver: boolean){
    this.router.navigate(['/ccita/edit/'+id+'/'+ver]);
  }

  async abrirModal(){
    const modal = await this.modalCtrl.create({
      component: McitaPage,
      cssClass: 'my-custom-class',      
      componentProps:{
        selectTipoCita:this.selectTipoCita,
        selectTipoDonacion:this.selectTipoDonacion,
      }
    });

    await modal.present();
    const {data} = await modal.onDidDismiss();

    this.selectTipoCita =data.arrayTipoCita;
    this.selectTipoDonacion =data.arrayTipoDonacion;

    this.buscar();
  }
}
