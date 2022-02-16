import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/_model/persona';
import { Sexo } from 'src/app/_model/sexo';
import { TipoDocumento } from 'src/app/_model/tipodocumento';
import { PersonaService } from 'src/app/_service/persona.service';
import { TipodocumentoService } from 'src/app/_service/tipodocumento.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../../components/loading/loading.service';
import { ToastService } from '../../components/toast/toast.service';

@Component({
  selector: 'app-crearpersona',
  templateUrl: './crearpersona.page.html',
  styleUrls: ['./crearpersona.page.scss'],
})
export class CrearpersonaPage implements OnInit {

  constructor(
    private router: Router,
    private personaService : PersonaService,
    private tipodocumentoService : TipodocumentoService,
    private loadingService : LoadingService,   
    private toastService : ToastService
  ) { }

  form: FormGroup = new FormGroup({});
  loading:any;
  listaTipoDocu: TipoDocumento[] = [];
  listaSexo: Sexo[] = [];
  listaTipoSangre: String[] = [];

  ngOnInit() {
    this.form = new FormGroup({
      'nIdPersona': new FormControl('0'),
      'nIdTipoDocu': new FormControl('0'),
      'vDocumento': new FormControl(''),
      'vNombres': new FormControl(''),
      'vApPaterno': new FormControl(''),
      'vApMaterno': new FormControl(''),
      'dFechaNac': new FormControl(''),
      'nSexo': new FormControl('0'),
      'vTipoSangre': new FormControl(''),
      'nTalla': new FormControl('0'),
      'nPeso': new FormControl('0'),
      'vCelular': new FormControl(''),
      'vEmail': new FormControl(''),
      'vDireccion': new FormControl(''),
      'nEsPaciente': new FormControl('0')      
    });
    this.listaSexo = environment.listaSexo;
    this.listaTipoSangre = environment.listaTipoSangre;
    this.listartipodocumento();
  }

  guardar(){

    let model = new Persona();

    model.nIdPersona = this.form.value['nIdPersona'];
    model.nIdTipoDocu= this.form.value['nIdTipoDocu'];

    this.loadingService.openLoading();
    this.personaService.guardar(model).subscribe(data=>{

      this.toastService.showNotification(data.typeResponse!,'Mensaje',data.message!);

      if(data.typeResponse==environment.EXITO){
        //this.router.navigate(['login']);
        this.loadingService.closeLoading();
      }else{
        this.loadingService.closeLoading();
      }

    });
  }

  listartipodocumento(){
    //this.loadingService.openLoading();
    this.tipodocumentoService.listar().subscribe(data=>{
      this.listaTipoDocu= data.items;
      //this.loadingService.closeLoading();
    });
  }

  obtenerHoy(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }
}
