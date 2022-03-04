import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Persona } from 'src/app/_model/persona';
import { Usuario } from 'src/app/_model/usuario';
import { Sexo } from 'src/app/_model/sexo';
import { TipoDocumento } from 'src/app/_model/tipodocumento';
import { PersonaService } from 'src/app/_service/persona.service';
import { TipodocumentoService } from 'src/app/_service/tipodocumento.service';
import { environment } from 'src/environments/environment';
import jsonSexo from 'src/assets/json/listasexo.json';
import jsonTipoSangre from 'src/assets/json/listasangre.json';
import { LoadingService } from '../../components/loading/loading.service';
import { ToastService } from '../../components/toast/toast.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
// import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-cpersona',
  templateUrl: './cpersona.page.html',
  styleUrls: ['./cpersona.page.scss'],
})
export class CpersonaPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personaService : PersonaService,
    private tipodocumentoService : TipodocumentoService,
    private loadingService : LoadingService,   
    private toastService : ToastService,
    private usuarioService: UsuarioService
    
  ) { 

    // this.route.queryParams.subscribe(params => {
    //   debugger;
    //   let data = this.router.getCurrentNavigation().extras.state;
    //   if (data) {
    //     // if (data.user.type === 'existing') {
    //     //   let token = data.user.accessToken;
    //     //   this.getUserProfileData(token);
    //     // }
    //     // else {
    //       // this.user = data.user;
    //     // }

    //     // this.signOut();
    //   }
    // });

  }

  form: FormGroup = new FormGroup({});
  loading:any;
  listaTipoDocu: TipoDocumento[] = [];
  listaSexo: Sexo[] = [];
  listaTipoSangre: String[] = [];
  date: Date;
  user: any;
  id: number = 0;
  verifcado: number = 0;
  email: String = "";
  $disable :boolean = false;

  ngOnInit() {

    let user = this.usuarioService.sessionGoogle();

    this.verifcado = (user.verifcado=="" || user.verifcado==null || user.verifcado==undefined)? 0: 1
    this.email = user.email;
    this.$disable = (this.verifcado== 1) ? true: false;

    this.form = new FormGroup({
      'nIdPersona': new FormControl({value: 0, disabled: false}),
      'nIdTipoDocu': new FormControl({value: 0, disabled: false}),
      'vDocumento': new FormControl({value: '', disabled: false}),
      'vNombres': new FormControl({value: user.nombre, disabled: false}),
      'vApPaterno': new FormControl({value: user.apePaterno, disabled: false}),
      'vApMaterno': new FormControl({value: user.apeMaterno, disabled: false}),
      'dFechaNac': new FormControl({value: '', disabled: false}),
      'nSexo': new FormControl({value: 0, disabled: false}),
      'vTipoSangre': new FormControl({value: '', disabled: false}),
      'nTalla': new FormControl({value: '', disabled: false}),
      'nPeso': new FormControl({value: '', disabled: false}),
      'vCelular': new FormControl({value: '', disabled: false}),
      'vDireccion': new FormControl({value: '', disabled: false}),
      'vEmail': new FormControl({value: user.email, disabled: this.$disable}),
      'vContrasena': new FormControl({value: '', disabled: false}),
      'vVerifContra': new FormControl({value: '', disabled: false}),
      'nEsPaciente': new FormControl({value: 0, disabled: true})
    });

    this.listarsexo();
    this.listartiposangre();
    this.listartipodocumento();

    this.obtener();
  }

  listarsexo(){
    this.listaSexo = [];

    for(var k in jsonSexo) {
      let sexo:Sexo = {};

      sexo.nIdSexo = jsonSexo[k].nIdSexo;
      sexo.vDescripcion = jsonSexo[k].vDescripcion;
      
      this.listaSexo.push(sexo);
    }
  }

  listartiposangre(){
    this.listaTipoSangre= [];

    for(var k in jsonTipoSangre) {
      let tipoSangre = jsonTipoSangre[k];
      
      this.listaTipoSangre.push(tipoSangre);
    }
  }

  obtener(){
    var token = this.usuarioService.sessionUsuario();

    //debugger;
    this.id = token !== null?token.UserId:0;

    if(this.id!=0){
      this.loadingService.openLoading();
      try{
        this.personaService.obtener(this.id).subscribe(data=>{
          //debugger;
          this.form.setValue({
            nIdPersona: data.nIdPersona,
            nIdTipoDocu: data.nIdTipoDocu,
            vDocumento: data.vDocumento,
            vNombres: data.vNombres,
            vApPaterno: data.vApPaterno,
            vApMaterno: data.vApMaterno,
            dFechaNac: data.dFechaNac.toString().slice(0,10),
            nSexo: data.nSexo,
            vTipoSangre: data.vTipoSangre,
            nTalla: data.nTalla===0?'':data.nTalla,
            nPeso: data.nPeso===0?'':data.nPeso,
            vCelular: data.vCelular,
            vDireccion: data.vDireccion,
            vEmail: data.vEmail,
            vContrasena: '',
            vVerifContra: '',
            nEsPaciente: data.nEsPaciente
          });
          this.loadingService.closeLoading();
  
        });
      }
      catch{
        this.toastService.showNotification(0,'Mensaje','Error en el servidor');
        this.loadingService.closeLoading();
      }      
    }
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

    let email = (this.verifcado == 1)? this.email : this.form.value['vEmail'];
    model.vEmail = email == undefined?'':email.toLowerCase()
    model.usuario.nIdUsuario = model.nIdPersona;
    model.usuario.vUsuario = model.vEmail;
    model.usuario.vContrasena = this.form.value['vContrasena'];
    model.usuario.vVerifContra = this.form.value['vVerifContra'];
    model.usuario.nCorreoVerif = this.verifcado;
    model.nEsPaciente = this.form.value['nEsPaciente'];
    
    //debugger;   
    
    this.loadingService.openLoading();
    this.personaService.guardar(model).subscribe(data=>{
      //debugger;
      
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
      if(data === undefined){
        this.toastService.showNotification(0,'Mensaje','Error en el servidor');
      }
      else{
        this.listaTipoDocu= data.items;
      }      
      this.loadingService.closeLoading();
    });

    //Precargar DNI
    this.form.patchValue(
      {
        nIdTipoDocu: this.listaTipoDocu.length>0?this.listaTipoDocu[0].nIdTipoDocu:0
      }
    )
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

  inicio(){
    this.router.navigate(['/inicio']);
  }

  irLogin(){
    this.router.navigate(['/login']);
  }
  

  // signOut() {
  //   GoogleAuth.signOut().then(() => {
  //     this.router.navigate(['/']);
  //   });
  // }

  // async getUserProfileData(token) {
  //   debugger;
  //   const options = {
  //     url: `https://www.googleapis.com/oauth2/v2/userinfo?key=452716635907-p5msqilrnhs7jigp47b4q4vv8q6btjhe.apps.googleusercontent.com&oauth_token=${token}`,
  //     headers:{'Content-Type': 'application/json'}
  //   };
  //   console.log(token);
  //   const response = await Http.request({ ...options, method: 'GET' });
  //   this.user = response.data;
  // }
}
