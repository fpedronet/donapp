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
import jsonDiaSemana from 'src/assets/json/listasemana.json';
import { LoadingService } from '../../components/loading/loading.service';
import { ToastService } from '../../components/toast/toast.service';
import { TipoCita } from 'src/app/_model/tipocita';
import { Banco } from 'src/app/_model/banco';
import { Campana } from 'src/app/_model/campana';
import { TipoDonacion } from 'src/app/_model/tipodonacion';
import { compareAsc, format } from 'date-fns';
import { DiaSemana } from 'src/app/_model/diasemana';
import { HorarioAtencion } from 'src/app/_model/horarioatencion';
import { Feriado } from 'src/app/_model/feriado';
import { Geolocalizacion } from 'src/app/_model/geolocalizacion';

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

  listaDiaSemana: DiaSemana[] = [];
  horarioAtencion: string[] = [];

  //Lista de horarios para validación de horario en back
  horarioBanco: HorarioAtencion[]=[];
  showHorario: boolean = false;

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
  listaFeriados: Feriado[] = [];
  
  //Lista de los que se muestran actualmente
  listaBancos: Banco[] = [];  
  listaCampanas: Campana[] = [];

  //Hora redondeada a 15 min más cercana

  minFechaCita: string = new Date().toISOString();
  maxFechaCita: string = new Date().toISOString();
  dProgramacion: Date = new Date();
  programadoFormatted: string = '';
  formatFechaHora: string = 'dd MMM yyyy, HH:mm'

  //Geolocalización
  geoLoc: Geolocalizacion = new Geolocalizacion();  

  id: number = 0;
  tipo: number = 0;
  ver: boolean = true;

  ngOnInit() {
    this.form = new FormGroup({
      'nIdCita': new FormControl({value: 0, disabled: false}),
      'nIdBanco': new FormControl({value: 0, disabled: false}),
      'nIdCampana': new FormControl({value: 0, disabled: false}),
      'vIdDepartamento': new FormControl({value: "00", disabled: false}),
      'vIdProvincia': new FormControl({value: "0000", disabled: false}),
      'dProgramacion': new FormControl({value: this.horaCuartoCercana(), disabled: false}),
      'vIdReceptor': new FormControl({value: '', disabled: false}),
    });

    this.dProgramacion = new Date(this.horaCuartoCercana());

    this.listartipocita();
    this.listartipodonacion();
    this.listarubigeo();
    this.listardiasemana();
    
    this.route.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? 0:data["id"];
      this.tipo = (data["tipo"]==undefined)? 0:data["tipo"];
      this.ver = (data["ver"]==undefined)? true:data["ver"]=="true";

      this.obtener();
      
      if(this.tipo !== 0){
        this.tipoCita = this.listaTipoCitas.find(e => e.nIdTipoCita == this.tipo);
      }      
    });
  }

  obtieneUbicacion() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position.coords.latitude + ',' + position.coords.longitude);
        //debugger;
        var geo = new Geolocalizacion();
        geo.lat = position.coords.latitude;
        geo.lng = position.coords.longitude;

        //debugger;

        //this.obtenerDtoYprovActual(geo);
      }, function(){
        console.log('Error al obtener ubicación')
      }, {
        enableHighAccuracy: false,
        maximumAge        : 30000,
        timeout           : 25000
      });
    } else {
      console.log('Geolocation is not supported');
    }
  }

  ngAfterViewInit(){
    //Limpia form si es nuevo
    if(this.id === 0){

      this.geoLoc.lat = -10.4725;
      this.geoLoc.lng = -76.9931;
      this.obtieneUbicacion();

      this.obtenerDtoYprovActual(this.geoLoc);
    }
  }

  obtenerDtoYprovActual(geo: Geolocalizacion){
    console.log('API GEO');
    let url = geo.api+'&lat='+geo.lat+'&lon='+geo.lng+'&zoom=10';
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        geo.vDpto = data.address.state;
        geo.vProv = data.address.region;
        //debugger;

        if(geo.vDpto !== '' && geo.vProv !== ''){
          var dpto = this.listaDepartamentos.find(e => geo.vDpto.includes(e.vNombre));
          geo.idDpto = dpto !== undefined?dpto.vUbigeo:"00";
          this.updateDpto(geo.idDpto);
  
          var prov = this.listaProvincias.find(e => geo.vProv.includes(e.vNombre));
          geo.idProv = prov !== undefined?prov.vUbigeo:"00";
          this.updateProv(geo.idProv);
        }

        this.form.setValue({
          nIdCita: 0,
          nIdBanco: 0,
          nIdCampana: 0,
          vIdDepartamento: geo.idDpto,
          vIdProvincia: geo.idProv,
          dProgramacion: this.horaCuartoCercana(),
          vIdReceptor: ''
        });
      })
      .catch(e => console.warn(e.message));
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

  updateDpto(idDpto: string){
    this.listaProvincias = [];

    let curDpto = this.listaDepartamentos.find(e => e.vUbigeo === idDpto)
    if(curDpto !== undefined){
      this.listaProvincias = curDpto.listaProvincias;
      //Si hay solo un elemento lo preselecciona, sino deselecciona
      let selValue = (this.listaProvincias.length === 1)?this.listaProvincias[0].vUbigeo:"0000";
      this.form.patchValue({
        vIdProvincia: selValue
      });
      //Reinicio banco y campaña
      this.form.patchValue({
        nIdBanco: 0,
        nIdCampana: 0
      });
    }    
  }

  updateProv(idProv: string){
    this.listaBancos = [];
    this.listaCampanas = [];

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

  filtrarUbigeos(){
    var listaElementos;
    if(this.tipo == 1 || this.tipo == 3){
      listaElementos = this.listaTotBancos;
    }
    else if(this.tipo == 2){
      listaElementos = this.listaCampanas;
    }
    if(listaElementos !== undefined){
      this.listaDepartamentos = this.listaDepartamentos.filter(e => listaElementos.find(f => f.vUbigeo.startsWith(e.vUbigeo)) !== undefined)
      this.listaDepartamentos.forEach(dpto => {
        dpto.listaProvincias = dpto.listaProvincias.filter(e => listaElementos.find(f => f.vUbigeo.startsWith(e.vUbigeo)) !== undefined)
      });
    }    
  }

  updateBanco(idBanco: number){
    this.horarioAtencion = []; //Reinicio horario de atención
    let curBanco = this.listaBancos.find(e => e.nIdBanco === idBanco)
    if(curBanco !== undefined){
      //debugger;
      this.fillHorarios(curBanco);
      this.setHorarioAtencion(curBanco.listaHorarios)
    }
  }

  actualizaProgramacion(value){
    //console.log(value);
    var dateString = value.toString().slice(0,19)
    //console.log(dateString);
    this.dProgramacion = new Date(dateString)
    this.programadoFormatted = format(this.dProgramacion, this.formatFechaHora)
  }

  fillHorarios(b: Banco){
    //debugger;
    if(b.listaHorarios === undefined || b.listaHorarios === null){
      b.listaHorarios = [];

      var rangos: string[] = [];
      let horas1: string[] = [];
      let horas2: string[] = [];
      let horario: HorarioAtencion;

      if(b.listaAten !== undefined){
        for(let i = 0; i < b.listaAten.length; i++){
          if(b.listaAten[i] !== null){
            rangos = b.listaAten[i].split(',');
    
            horas1 = rangos[0].split('-');
            horas2 = ['',''];
            if (rangos.length > 1)
                horas2 = rangos[1].split('-');
    
            horario = new HorarioAtencion(b.nIdBanco, i+1, horas1[0], horas1[1], horas2[0], horas2[1]);
            b.listaHorarios.push(horario);
          }
        }
      }
      
      this.horarioBanco = b.listaHorarios;
    }
  }

  setHorarioAtencion(horarios: HorarioAtencion[]){
    this.horarioAtencion = []
    var diaHorario: string;
    var diaSemana: DiaSemana;
    if(horarios !== undefined){
      horarios.forEach(h => {
        //debugger;
        diaSemana = this.listaDiaSemana.find(e => e.nIdDiaSemana === h.nDia);
        if(diaSemana !== undefined){
          diaHorario = diaSemana.vDescripcion + ': ' + h.vHoraIni1 + '-' + h.vHoraFin1;
          if(h.vHoraIni2 !== ''){
            diaHorario = diaHorario + ', ' + h.vHoraIni2 + '-' + h.vHoraFin2;
          }
          this.horarioAtencion.push(diaHorario);
        }
        
      });
    }
  }

  obtener(){
    this.loadingService.openLoading();
    this.citaService.obtener(this.id).subscribe(data=>{
      
      //Extrae listas para combobox de bancos y campañas
      this.listaTotBancos = data.listaBancos;
      this.listaTotCampanas = data.listaCampanas;
      this.listaFeriados = data.listaFeriados;

      this.filtrarUbigeos();

      //Configurar calendario
      this.minFechaCita = this.horaCuartoCercana(data.nCitaHorasMin);
      this.maxFechaCita = this.horaCuartoCercana(data.nCitaHorasMax);
      this.form.patchValue({
        dProgramacion: this.minFechaCita
      });
      this.programadoFormatted = format(new Date(this.minFechaCita), this.formatFechaHora)

      if(this.id !== 0){
        //Selecciona el tipo de cita
        this.tipoCita = this.listaTipoCitas.find(e => e.nIdTipoCita == data.nTipoCita);
        this.tipo = this.tipoCita.nIdTipoCita;
        
        //Selecciona el tipo de donación
        this.seleccionaTipoDonacion(undefined, data.nTipoDonacion);

        //Actualiza combobox para ubicación
        var idDpto = data.vUbigeo.slice(0,2);
        var idProv = data.vUbigeo.slice(0,4);

        this.updateDpto(idDpto);
        this.updateProv(idProv);
        this.updateBanco(data.nIdBanco);

        this.form.setValue({
          nIdCita: data.nIdCita,
          vIdDepartamento: idDpto,
          vIdProvincia: idProv,
          nIdBanco: data.nIdBanco,
          nIdCampana: data.nIdCampana,
          dProgramacion: data.dProgramacion,
          vIdReceptor: data.vIdReceptor
        })

        /*this.form.patchValue({
          vIdDepartamento: idDpto
        },
        {
          onlySelf: true,
          emitEvent: false
        });*/

        //Actualiza fecha
        this.dProgramacion = new Date(data.dProgramacion);
        this.programadoFormatted = format(this.dProgramacion, this.formatFechaHora);
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
    model.dProgramacion = this.dProgramacion;
    model.nTipoCita = this.tipoCita.nIdTipoCita;
    model.nTipoDonacion = this.tipoDonacion.nIdTipoDonacion;
    model.vIdReceptor = this.form.value['vIdReceptor'];
    model.listaHorarios = this.horarioBanco;
    model.listaFeriados = this.listaFeriados;

    //debugger;
    
    this.loadingService.openLoading();
    this.citaService.guardar(model).subscribe(data=>{
      
      this.toastService.showNotification(data.typeResponse!,'Mensaje',data.message!);

      if(data.typeResponse==environment.EXITO){
        this.loadingService.closeLoading();

       this.router.navigate(['lcita']);
        
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
    var day = new Date();
    if(yearsDif !== 0){
      day.setMonth(day.getMonth() + yearsDif*12 + monthsDif);
    }

    return format(day, 'yyyy-MM-dd') + 'T08:00:00.000Z';
  }

  horaCuartoCercana(difHoras: number = 0){
    //debugger;
    var day = new Date();
    day.setSeconds(0, 0);

    let minutes = day.getMinutes();
    let mod = minutes % 15;

    day.setMinutes(day.getMinutes() + (15-mod));
    
    day.setHours(day.getHours() + difHoras);

    var hh = day.getHours();
    var mm = day.getMinutes();
    //2012-12-15T13:47:20.789
    var fechaStr = format(day, 'yyy-MM-dd') + 'T';
    var horaStr =  hh.toString().padStart(2, '00') + ':' + mm.toString().padStart(2, '00') + ':00.000';
    return fechaStr + horaStr;
  }

  inicio(){
    this.router.navigate(['/inicio']);
  }

  regresar(){
    // if(this.ver)
    //   this.router.navigate(['/inicio']);
    // else
    //   this.router.navigate(['/lcita']);
    this.router.navigate(['/lcita']);
  }

  resetHour(){

  }
}
