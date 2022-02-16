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

  ngOnInit() {
    this.form = new FormGroup({
      'nIdPersona': new FormControl('0'),
      'nIdTipoDocu': new FormControl('0'),
      'vDocumento': new FormControl(''),
      'vNombres': new FormControl(''),
      'vApPaterno': new FormControl(''),
      'vApMaterno': new FormControl(''),
      'dFechaNac': new FormControl(this.obtenerHoy()),
      'nSexo': new FormControl('0'),
      'vTipoSangre': new FormControl(''),
      'nTalla': new FormControl('0'),
      'nPeso': new FormControl('0'),
      'vCelular': new FormControl(''),
      'vDireccion': new FormControl(''),
      'vEmail': new FormControl(''),
      'vContrasena': new FormControl(''),
      'nEsPaciente': new FormControl('0')
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
    model.dFechaNac = this.form.value['dFechaNac'];
    model.nSexo = this.form.value['nSexo'];
    model.vTipoSangre = this.form.value['vTipoSangre'];
    model.nTalla = this.form.value['nTalla'];
    model.nPeso = this.form.value['nPeso'];
    model.vCelular = this.form.value['vCelular'];
    model.vDireccion = this.form.value['vDireccion'];
    model.vEmail = this.form.value['vEmail'];
    model.usuario.vUsuario = this.form.value['vEmail'];
    model.usuario.vContrasena = this.form.value['vContrasena'];
    model.nEsPaciente = this.form.value['nEsPaciente'];

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

    return yyyy + '-' + mm + '-' + dd;
  }

  irLogin(){
    this.router.navigate(['login']);
  }  
}
