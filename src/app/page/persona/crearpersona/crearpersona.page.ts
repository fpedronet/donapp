import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/_model/persona';
import { Usuario } from 'src/app/_model/usuario';
import { Sexo } from 'src/app/_model/sexo';
import { TipoDocumento } from 'src/app/_model/tipodocumento';
import { PersonaService } from 'src/app/_service/persona.service';
import { TipodocumentoService } from 'src/app/_service/tipodocumento.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
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
  date: Date;

  ngOnInit() {
    this.form = new FormGroup({
      'nIdPersona': new FormControl({value: 0, disabled: true}),
      'nIdTipoDocu': new FormControl({value: 0, disabled: false}),
      'vDocumento': new FormControl({value: '', disabled: false}),
      'vNombres': new FormControl({value: '', disabled: false}),
      'vApPaterno': new FormControl({value: '', disabled: false}),
      'vApMaterno': new FormControl({value: '', disabled: false}),
      'dFechaNac': new FormControl({value: this.obtenerFecha(), disabled: false}),
      'nSexo': new FormControl({value: 0, disabled: false}),
      'vTipoSangre': new FormControl({value: '', disabled: false}),
      'nTalla': new FormControl({value: '', disabled: false}),
      'nPeso': new FormControl({value: '', disabled: false}),
      'vCelular': new FormControl({value: '', disabled: false}),
      'vDireccion': new FormControl({value: '', disabled: false}),
      'vEmail': new FormControl({value: '', disabled: false}),
      'vContrasena': new FormControl({value: '', disabled: false}),
      'vVerifContra': new FormControl({value: '', disabled: false}),
      'nEsPaciente': new FormControl({value: 0, disabled: true})
    });
    this.listaSexo = environment.listaSexo;
    this.listaTipoSangre = environment.listaTipoSangre;
    this.listartipodocumento();
  }

  guardar(){

    let model = new Persona();
    model.usuario = new Usuario();

    model.nIdPersona = this.form.value['nIdPersona'];
    model.nIdTipoDocu = this.form.value['nIdTipoDocu'];
    model.vDocumento = this.form.value['vDocumento'];
    model.vNombres = this.form.value['vNombres'];
    model.vApPaterno = this.form.value['vApPaterno'];
    model.vApMaterno = this.form.value['vApMaterno'];
    //Si la fecha es inválida, le da una del futuro, esto únicamente para validar en back
    model.dFechaNac = (this.form.value['dFechaNac']=='')?this.obtenerFecha(1):this.form.value['dFechaNac'];
    model.nSexo = this.form.value['nSexo'];
    model.vTipoSangre = this.form.value['vTipoSangre'];
    model.nTalla = (this.form.value['nTalla']=='')?0:this.form.value['nTalla'];
    if(model.nTalla == null) model.nTalla = 0;
    model.nPeso = (this.form.value['nPeso']=='')?0:this.form.value['nPeso'];
    if(model.nPeso == null) model.nPeso = 0;
    model.vCelular = this.form.value['vCelular'];
    model.vDireccion = this.form.value['vDireccion'];
    model.vEmail = this.form.value['vEmail'];
    model.usuario.vUsuario = this.form.value['vEmail'];
    model.usuario.vContrasena = this.form.value['vContrasena'];
    model.usuario.vVerifContra = this.form.value['vVerifContra'];
    model.nEsPaciente = this.form.value['nEsPaciente'];
    //debugger;   
    
    this.loadingService.openLoading();
    this.personaService.guardar(model).subscribe(data=>{
      
      this.toastService.showNotification(data.typeResponse!,'Mensaje',data.message!);

      if(data.typeResponse==environment.EXITO){
        this.loadingService.closeLoading();
        this.router.navigate(['login']);
        
      }else{
        this.loadingService.closeLoading();
      }

    });
  }

  listartipodocumento(){
    this.loadingService.openLoading();
    this.tipodocumentoService.listar().subscribe(data=>{
      this.listaTipoDocu= data.items;
      this.loadingService.closeLoading();
    });
  }

  obtenerFecha(yearsDif: number = 0){
    var today = new Date();
    if(yearsDif !== 0){
      today.setMonth(today.getMonth() + yearsDif*12);
    }
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  irLogin(){
    this.router.navigate(['login']);
  }
  
}
