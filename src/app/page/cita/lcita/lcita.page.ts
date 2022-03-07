import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

import { CitaService } from 'src/app/_service/cita.service';
import { LoadingService } from '../../components/loading/loading.service';
import { ToastService } from '../../components/toast/toast.service';

import jsonTipoCita from 'src/assets/json/listacita.json';
import jsonTipoDonacion from 'src/assets/json/listadonacion.json';

import { TipoCita } from 'src/app/_model/tipocita';
import { TipoDonacion } from 'src/app/_model/tipodonacion';
import { Cita, CitaRequest } from 'src/app/_model/cita';

@Component({
  selector: 'app-lcita',
  templateUrl: './lcita.page.html',
  styleUrls: ['./lcita.page.scss'],
})
export class LcitaPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private citaService: CitaService,
    private loadingService : LoadingService,   
    private toastService : ToastService
  ) { }

  dataSource: Cita[] = [];
  dataCita: Cita[] = [];
  listaTipoCitas: TipoCita[] = [];
  listaTipoDonaciones: TipoDonacion[] = [];
  selectTipoCita: number[] = [];
  selectTipoDonacion: number[] = [];

  sinResultados: string = '';

  //Total mostrado en pantalla
  total: number = 0;
  //Total existente
  totalResult: number = 0;
  data: string = "";
  page: number= 0;

  ngOnInit() {
    console.log("Init Lista citas")
    this.listartipocita();
    this.listartipodonacion();
    /*setTimeout(() => {
      this.buscar();
    }, 500)*/
    this.buscar();
  }
  
  ngAfterViewInit(){
    //console.log("muestra lista2");
    /*setTimeout(() => {
      this.buscar();
    }, 500)*/
  }

  loadData(event?) {
    setTimeout(() => {

      let model = new CitaRequest;
      model.data= this.data;
      model.listaTipocita= this.selectTipoCita;
      model.listTipodonacion= this.selectTipoDonacion;
      this.page = this.page+1;
      model.page= this.page;
      model.pages= 10;

      //this.loadingService.openLoading();
      
      this.citaService.listar(model).subscribe(data=>{

      this.dataSource = data.items;
        //debugger;
        
        if(this.dataSource.length === 0){
          this.sinResultados = 'No se encontraron resultados';
        }

        // if(this.dataSource.length > 0){

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

          //this.loadingService.closeLoading();

          //  this.dataCita = this.dataSource;
          this.total += data.pagination.pages;
          this.totalResult = data.pagination.total;

          if(this.total >= data.pagination.total){
            this.totalResult = data.pagination.total;
            this.infiniteScroll.complete();
            this.infiniteScroll.disabled = true;
            this.page = 0;

            return false;
          }
       
      });      

      this.infiniteScroll.complete();

      this.page++;

    }, 500);
  }

  buscar(){
    this.dataCita = [];
    this.sinResultados = '';
    this.totalResult = 0;
    this.total = 0;
    this.loadData();
  }

  listartipocita(){
    this.listaTipoCitas = [];

    for(var i in jsonTipoCita) {
      let tipo: TipoCita = {};

      tipo.nIdTipoCita = jsonTipoCita[i].nIdTipoCita;
      tipo.vDescripcion = jsonTipoCita[i].vDescripcion;

      this.listaTipoCitas.push(tipo);

      //Inicializa con todas las opciones marcadas
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

      //Inicializa con todas las opciones marcadas
      this.selectTipoDonacion.push(tipo.nIdTipoDonacion);
    }
  }

  nuevo(){
    this.router.navigate(['/ccita/create/1']);
  }

  edit(id: number, ver: boolean){
    this.router.navigate(['/ccita/edit/'+id+'/'+ver]);
  }

}
