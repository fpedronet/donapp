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
import { LoadingService } from '../../components/loading/loading.service';
import { ToastService } from '../../components/toast/toast.service';

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
  listaDepartamentos: Departamento[] = [];
  curProv: string = '';
  listaProvincias: Provincia[] = [];

  id: number = 0;

  ngOnInit() {
    this.form = new FormGroup({
      'nIdCita': new FormControl({value: 0, disabled: true}),
      'vIdDepartamento': new FormControl({value: "00", disabled: false}),
      'vIdProvincia': new FormControl({value: "0000", disabled: false})
    });

    this.listardepartamentos()

    this.route.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? 0:data["id"];
      this.obtener();
    });
  }

  listardepartamentos(){
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
    //this.form.value["vIdProvincia"] = "00"
    //this.curProv = "00"
  }

  obtener(){
    if(this.id!=0){
      this.loadingService.openLoading();
      this.citaService.obtener(this.id).subscribe(data=>{

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
