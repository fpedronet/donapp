import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cita } from 'src/app/_model/cita';
import { Departamento } from 'src/app/_model/departamento';
import { Provincia } from 'src/app/_model/provincia';
import { CitaService } from 'src/app/_service/cita.service';
import { environment } from 'src/environments/environment';
import jsonDepartamento from 'src/assets/json/ubigeo/departamentos.json';
import jsonProvincia from 'src/assets/json/ubigeo/provincias.json';
import jsonDistrito from 'src/assets/json/ubigeo/distritos.json';
import jsonTipoCita from 'src/assets/json/listacita.json';
import jsonTipoDonacion from 'src/assets/json/listadonacion.json';
import { LoadingService } from '../../components/loading/loading.service';
import { ToastService } from '../../components/toast/toast.service';
import { TipoCita } from 'src/app/_model/tipocita';
import { Banco } from 'src/app/_model/banco';
import { Campana } from 'src/app/_model/campana';
import { TipoDonacion } from 'src/app/_model/tipodonacion';

@Component({
  selector: 'app-ccita',
  templateUrl: './ccita.page.html',
  styleUrls: ['./ccita.page.scss'],
})
export class CcitaPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private citaService: CitaService,
    private loadingService : LoadingService,   
    private toastService : ToastService
  ) { }

  form: FormGroup = new FormGroup({});
  loading:any;

  listaTipoCitas: TipoCita[] = [];
  listaTipoDonaciones: TipoDonacion[] = [];
  tipoCita: TipoCita = new TipoCita(0, 'Tipo cita no identificado');
  tipoDonacion: TipoDonacion;

  //Los totales de departamentos y provincias están en el json
  listaDepartamentos: Departamento[] = [];
  listaProvincias: Provincia[] = [];

  //Lista total
  listaTotBancos: Banco[] = [];
  listaTotCampanas: Campana[] = [];
  
  //Lista de los que se muestran actualmente
  listaBancos: Banco[] = [];  
  listaCampanas: Campana[] = [];

  //Hora redondeada a 15 min más cercana
  horaIni: string = this.horaCuartoCercana();

  id: number = 0;
  tipo: number = 0;

  ngOnInit() {
    this.form = new FormGroup({
      'nIdCita': new FormControl({value: 0, disabled: true}),
      'nIdBanco': new FormControl({value: 0, disabled: true}),
      'nIdCampana': new FormControl({value: 0, disabled: true}),
      'vIdDepartamento': new FormControl({value: "00", disabled: false}),
      'vIdProvincia': new FormControl({value: "0000", disabled: false}),
      'dProgramacion': new FormControl({value: this.horaCuartoCercana(), disabled: false}),
      'vIdReceptor': new FormControl({value: '', disabled: false}),
    });

    this.listartipocita();
    this.listartipodonacion();
    this.listarubigeo();    

    this.route.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? 0:data["id"];
      this.tipo = (data["tipo"]==undefined)? 0:data["tipo"];

      this.obtener();
      
      if(this.tipo !== 0){
        this.tipoCita = this.listaTipoCitas.find(e => e.nIdTipoCita == this.tipo);
      }      
    });
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

    //Tipo donación por defecto
    this.tipoDonacion = this.listaTipoDonaciones[0];
  }

  listarubigeo(){
    this.listaDepartamentos = [];

    for(var i in jsonDepartamento) {
      let dpto: Departamento = {};

      dpto.vUbigeo = jsonDepartamento[i].id;
      dpto.vNombre = jsonDepartamento[i].name;
      dpto.listaProvincias = [];

      for(var j in jsonProvincia) {
        let prov: Provincia = {};

        prov.vUbigeo = jsonProvincia[j].id;
        prov.vNombre = jsonProvincia[j].name;

        //Agrega provincia si pertenece al distrito
        if(jsonProvincia[j].department_id === dpto.vUbigeo)
          dpto.listaProvincias.push(prov);
      }
      
      this.listaDepartamentos.push(dpto);
    }
  }

  updateDpto(idDpto: string){
    let curDpto = this.listaDepartamentos.find(e => e.vUbigeo === idDpto)
    if(curDpto !== undefined){
      this.listaProvincias = curDpto.listaProvincias;
      //Si hay solo un elemento lo preselecciona, sino deselecciona
      let selValue = (this.listaProvincias.length === 1)?this.listaProvincias[0].vUbigeo:"0000"
      this.form.patchValue({
        vIdProvincia: selValue
      });
    }    
  }

  updateProv(idProv: string){
    let curProv = this.listaProvincias.find(e => e.vUbigeo === idProv)
    if(curProv !== undefined){
      if(this.tipo == 1 || this.tipo == 3){
        //Filtra los bancos cuyo ubigeo coincide con el de provincia al inicio
        this.listaBancos = this.listaTotBancos.filter(e => e.vUbigeo.startsWith(curProv.vUbigeo));
        //Si hay solo un elemento lo preselecciona, sino deselecciona
        let selValue = (this.listaBancos.length === 1)?this.listaBancos[0].nIdBanco:0;
        this.form.patchValue({
          nIdBanco: selValue
        });
      }
      else if(this.tipo == 2){
        //Filtra las campañas cuyo ubigeo coincide con el de provincia al inicio
        this.listaCampanas = this.listaTotCampanas.filter(e => e.vUbigeo.startsWith(curProv.vUbigeo));
        //Si hay solo un elemento lo preselecciona, sino deselecciona
        let selValue = (this.listaCampanas.length === 1)?this.listaCampanas[0].nIdCampana:0;
        this.form.patchValue({
          nIdCampana: selValue
        });
      }
    }    
  }

  obtener(){
    this.loadingService.openLoading();
    this.citaService.obtener(this.id).subscribe(data=>{
      
      //Extrae listas para combobox de bancos y campañas
      this.listaTotBancos = data.listaBancos;
      this.listaTotCampanas = data.listaCampanas;

      if(this.id !== 0){
        //Selecciona el tipo de cita
        this.tipoCita = this.listaTipoCitas.find(e => e.nIdTipoCita == data.nTipoCita);

        this.seleccionaTipoDonacion(undefined, data.nTipoDonacion);

        this.form = new FormGroup({
          'nIdCita': new FormControl({value: data.nIdCita, disabled: true}),
          'nIdBanco': new FormControl({value: data.nIdBanco, disabled: false}),
          'nIdCampana': new FormControl({value: data.nIdCampana, disabled: false}),
          'dProgramacion': new FormControl({value: data.dProgramacion, disabled: false}),
          'vIdReceptor': new FormControl({value: data.vIdReceptor, disabled: false}),
        });
      }      
      
      this.loadingService.closeLoading();

    });
  }

  guardar(){

    let model = new Cita();

    model.nIdCita = this.form.value['nIdCita'];
    model.nIdBanco = this.form.value['nIdBanco'];
    model.nIdCampana = this.form.value['nIdCampana'];
    model.nIdDonante = 0, //Se registra el del mismo usuario en el back
    model.dProgramacion = this.form.value['dProgramacion'];
    model.nTipoCita = this.tipoCita.nIdTipoCita;
    model.nTipoDonacion = this.tipoDonacion.nIdTipoDonacion;
    model.vIdReceptor = this.form.value['vIdReceptor'];
    
    this.loadingService.openLoading();
    this.citaService.guardar(model).subscribe(data=>{
      
      this.toastService.showNotification(data.typeResponse!,'Mensaje',data.message!);

      if(data.typeResponse==environment.EXITO){
        this.loadingService.closeLoading();
        this.router.navigate(['inicio']);
        
      }else{
        this.loadingService.closeLoading();
      }

    });
  }

  seleccionaTipoDonacion(event, idTipoDonacion = 0){
    let value = (idTipoDonacion === 0)?event.detail.value:idTipoDonacion;
    this.tipoDonacion = this.listaTipoDonaciones.find(e => e.nIdTipoDonacion == value);
  }

  obtenerFecha(yearsDif: number = 0, monthsDif: number = 0){
    var today = new Date();
    if(yearsDif !== 0){
      today.setMonth(today.getMonth() + yearsDif*12 + monthsDif);
    }
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  horaCuartoCercana(){
    //debugger;
    var today = new Date();
    today.setSeconds(0, 0);

    let minutes = today.getMinutes();
    let mod = minutes % 15;

    today.setMinutes(today.getMinutes() + (15-mod));

    var dd = String(today.getDate()).padStart(2, '0');
    var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var mm = today.getMinutes();
    //2012-12-15T13:47:20.789
    return yyyy + '-' + MM + '-' + dd + 'T' + hh + ':' + mm;
  }

  irHome(){
    this.router.navigate(['inicio']);
  }

  resetHour(){
    this.form.patchValue({
      dProgramacion: this.horaIni
    });
  }
}
