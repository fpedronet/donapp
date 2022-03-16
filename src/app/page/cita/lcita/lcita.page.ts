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
import { AlertService } from '../../components/alert/alert.service';
import { DiaSemana } from 'src/app/_model/diasemana';
import jsonDiaSemana from 'src/assets/json/listasemana.json';
import jsonEstado from 'src/assets/json/listaestado.json';
import { Estado } from 'src/app/_model/estado';
import { LoadingService } from '../../components/loading/loading.service';
import { ToastService } from '../../components/toast/toast.service';

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
    private alertService : AlertService,
    private toastService : ToastService,
    private loadingService : LoadingService,
    private modalCtrl: ModalController
  ) { }

  dataSource: Cita[] = [];
  dataCita: Cita[] = [];
  sinResultados: string = 'Buscando resultados...';

  total: number = 0;
  totalResult: number = 0;
  data: string = "";
  page: number = 1;
  
  listaEstado: Estado[] = [];
  listaDiaSemana: DiaSemana[] = [];
  listaTipoCitas: TipoCita[] = [];
  listaTipoDonaciones: TipoDonacion[] = [];
  selectTipoCita: number[] = [];
  selectTipoDonacion: number[] = [];

  currentTab: number = 1;
  slideDistance: number = 150;
  slideDer: boolean = true;
  
  ngOnInit() {
    this.listartipocita();
    this.listartipodonacion();
    this.listardiasemana();
    this.listarestado();
    this.buscar(this.currentTab);

    this.slideDistance = window.screen.width/3;
    //console.log(this.slideDistance);
  }
  
  loadData(tipo: number, event?) {
    // setTimeout(() => {

      let model = new CitaRequest;
      model.data = this.data;
      model.tipo = tipo;
      model.listaTipocita = this.selectTipoCita;
      model.listTipodonacion = this.selectTipoDonacion;
      model.page = this.page;
      model.pages = 10;

      this.citaService.listar(model).subscribe(data=>{

      this.dataSource = data.items;
        //debugger;
        if(this.dataSource.length === 0){
          this.sinResultados = 'No se encontraron resultados';
        }

         this.dataSource.forEach(element => {          
            let model = new Cita();
  
            model.nIdCita= element.nIdCita;
            model.fechaProgramada= element.fechaProgramada;
            
            //Obtiene día de la semana
            var cadenaDate = model.fechaProgramada.slice(0,10);
            var dayArr = cadenaDate.split('/');
            var idDia = new Date(dayArr[2]+'-'+dayArr[1]+'-'+dayArr[0]).getDay() + 1;
            var dia = this.listaDiaSemana.find(e => e.nIdDiaSemana === idDia);
            if(dia !== undefined)
              model.diaProgramado = dia.vDescripcion;
            else
              model.diaProgramado = '';

            model.nTipoCita = element.nTipoCita;
            model.vTipoCita = element.vTipoCita;
            model.vTipoDonacion = element.vTipoDonacion;
            model.vIcon = "../../../../assets/"+element.vIcon;
            model.vBanco = element.vBanco;
            model.vCampana = element.vCampana;

            model.nRegistrado = element.nRegistrado;
            model.nRealizado = element.nRealizado;
            model.nEstado = element.nEstado;

            //debugger;

            model.estado = this.obtenerEstado(model.nRegistrado, model.nRealizado, model.nEstado);
            //var elemHtml = document.getElementById('myelement');
            //elemHtml.style.setProperty("--color-"+model.estado.nIdEstado, model.estado.color);
  
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

  obtenerEstado(regis: number, reali: number, exist: number){
    var estado: number = 1;

    //Verificado
    if(regis === 1)
      estado = 2;
    //Donó, No donó, Faltó
    if(reali > 0)
      estado = reali + 3;
    //Cancelado
    if(exist === 0)
      estado = 3;

    var res = this.listaEstado.find(e => e.nIdEstado === estado);
    
    return res===undefined?this.listaEstado[0]:res;
  }

  buscarTab(tab: number){
    if(this.currentTab !== tab){
      this.currentTab = tab;
      this.slideDer = !this.slideDer;
      //console.log('slideDer: '+this.slideDer);
      this.buscar(tab);
    }    
  }

  buscar(tipo: number){
    this.dataCita = [];
    this.sinResultados = 'Buscando resultados...';
    this.totalResult = 0;
    this.total = 0;
    this.page=1;
    this.loadData(tipo);
  }

  listartipocita(){
    this.listaTipoCitas = [];

    for(var i in jsonTipoCita) {
      let tipo: TipoCita = {};

      tipo.nIdTipoCita = jsonTipoCita[i].nIdTipoCita;
      tipo.vDescripcion = jsonTipoCita[i].vDescripcion;
      tipo.visual = jsonTipoCita[i].visual;

      if(tipo.visual){
        this.listaTipoCitas.push(tipo);
        this.selectTipoCita.push(tipo.nIdTipoCita);
      }        
    }
  }

  listartipodonacion(){
    this.listaTipoDonaciones = [];

    for(var i in jsonTipoDonacion) {
      let tipo: TipoDonacion = {};

      tipo.nIdTipoDonacion = jsonTipoDonacion[i].nIdTipoDonacion;
      tipo.vDescripcion = jsonTipoDonacion[i].vDescripcion;
      tipo.visual = jsonTipoDonacion[i].visual;

      if(tipo.visual){
        this.listaTipoDonaciones.push(tipo);
        this.selectTipoDonacion.push(tipo.nIdTipoDonacion);
      }      
    }
  }

  listardiasemana(){
    this.listaDiaSemana = [];

    for(var i in jsonDiaSemana) {
      let dia: DiaSemana = {};

      dia.nIdDiaSemana = jsonDiaSemana[i].nIdSemana;
      dia.vDescripcion = jsonDiaSemana[i].vDescripcion;
      dia.vAbrev = jsonDiaSemana[i].vAbrev;

      this.listaDiaSemana.push(dia);
    }
  }

  listarestado(){
    this.listaEstado = [];

    for(var i in jsonEstado) {
      let estado: Estado = {};

      estado.nIdEstado = jsonEstado[i].nIdEstado;
      estado.vDescripcion = jsonEstado[i].vDescripcion;
      estado.vDetalle = jsonEstado[i].vDetalle;
      estado.vMensaje = jsonEstado[i].vMensaje;

      estado.icon = jsonEstado[i].icon;
      estado.color = jsonEstado[i].color;
      estado.visual = jsonEstado[i].visual;

      this.listaEstado.push(estado);

      this.crearClasesCss(estado.nIdEstado, estado.color);
    }
  }

  crearClasesCss(id: number, color: string){
    var editCSS = document.createElement('style')
    editCSS.innerHTML = ".text-estado-" + id + " {color: " + color + ";}";
    document.body.appendChild(editCSS);
  }

  nuevo(){
    var opciones = []
    this.listaTipoCitas.forEach(tipo => {
      opciones.push(tipo.vDescripcion);
    });
    //debugger;
    if(opciones.length <= 1){
      this.router.navigate(['/ccita/create/'+this.listaTipoCitas[0].nIdTipoCita]);
    }
    else{
      this.alertService.showNotification('Agendar cita','Seleccione el tipo de cita','','',opciones).then(res => {
        let tipoSel = this.listaTipoCitas.find(e => e.vDescripcion === res);
        if (tipoSel !== undefined) {
          this.router.navigate(['/ccita/create/'+tipoSel.nIdTipoCita]);
        }
      });
    }
    
  }

  edit(id: number, ver: boolean){
    this.router.navigate(['/ccita/edit/'+id+'/'+ver]);
  }

  cancel(id: number, estado: number){
    //Si ha sido registrado en Donalab muestra mensaje
    var mensaje
    if(estado === 2){
      mensaje = 'Su cita ya ha sido registrada. Además, cancelar una cita es irreversible.<br>¿Desea continuar?';
    }
    else{
      mensaje = 'Cancelar una cita es irreversible.<br>¿Desea continuar?';
    }
    this.alertService.showNotification('Cancelar cita',mensaje) .then(res => {
      if (res === 'ok') {
        this.citaService.eliminar(id).subscribe(data=>{
          this.toastService.showNotification(data.typeResponse!,'Mensaje',data.message!);
          this.loadingService.closeLoading();
        });
      }
    });
    
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

    if(data.arrayTipoCita !== undefined && data.arrayTipoDonacion !== undefined){
      this.selectTipoCita =data.arrayTipoCita;
      this.selectTipoDonacion =data.arrayTipoDonacion;
      this.buscar(this.currentTab);
    }    
  }

  openSlide(slide){
    slide.getOpenAmount().then(res=>{
      //console.log(res);
      if(Math.abs(res)>this.slideDistance){
        if(this.currentTab===1)
          this.buscarTab(2);
        else
          this.buscarTab(1);
        slide.close();
      }
        
    })    
  }
}
