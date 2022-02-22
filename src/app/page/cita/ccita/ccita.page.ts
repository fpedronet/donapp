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
import { LoadingService } from '../../components/loading/loading.service';
import { ToastService } from '../../components/toast/toast.service';
import { TipoCita } from 'src/app/_model/tipocita';
import { Banco } from 'src/app/_model/banco';
import { Campana } from 'src/app/_model/campana';

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
  tipoCita: TipoCita = new TipoCita(0, 'Tipo cita no identificado');

  listaDepartamentos: Departamento[] = [];
  listaProvincias: Provincia[] = [];
  listaBancos: Banco[] = [];
  listaCampanas: Campana[] = [];  

  id: number = 0;
  tipo: number = 0;

  ngOnInit() {
    this.form = new FormGroup({
      'nIdCita': new FormControl({value: 0, disabled: true}),
      'nIdBanco': new FormControl({value: 0, disabled: true}),
      'nIdCampana': new FormControl({value: 0, disabled: true}),
      'vIdDepartamento': new FormControl({value: "00", disabled: false}),
      'vIdProvincia': new FormControl({value: "0000", disabled: false})
    });

    this.listartipocita();
    this.listarubigeo();    

    this.route.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? 0:data["id"];
      this.tipo = (data["tipo"]==undefined)? 0:data["tipo"];
      //this.obtener();
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
    this.listaProvincias = curDpto.listaProvincias;
    //Reinicia provincia
    this.form.patchValue({
      vIdProvincia: "0000",
    });
  }

  obtener(){
    if(this.id!=0){
      this.loadingService.openLoading();
      this.citaService.obtener(this.id).subscribe(data=>{
        //Selecciona el tipo de cita
        if(this.id !== 0){
          this.tipoCita = this.listaTipoCitas.find(e => e.nIdTipoCita == data.nTipoCita);
        }

        //Extrae listas para combobox de bancos y campañas
        this.listaBancos = data.listaBancos;
        this.listaCampanas = data.listaCampanas;

        this.form = new FormGroup({
          /*'nIdPersona': new FormControl({value: data.nIdPersona, disabled: true}),
          'nIdTipoDocu': new FormControl({value: data.nIdTipoDocu, disabled: false}),*/
        });
        this.loadingService.closeLoading();

      });      
    }
  }

  guardar(){

    let model = new Cita();

    model.nIdCita = this.form.value['nIdCita'];
    //debugger;   
    
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

  irHome(){
    this.router.navigate(['inicio']);
  }

}
