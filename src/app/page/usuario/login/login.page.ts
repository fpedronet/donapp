import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { LoadingService } from '../../components/loading/loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private usuarioService : UsuarioService,
    private loadingService : LoadingService   

  ) { }

  form: FormGroup = new FormGroup({});
  loading:any;

  ngOnInit() {
    
    this.form = new FormGroup({
      'nIdCliente': new FormControl(),
      'usuario': new FormControl(''),
      'clave': new FormControl('')
    });
  }

  login(){
debugger;
    let model = new Usuario();

    model.nIdCliente= this.form.value['nIdCliente'];
    model.usuario = this.form.value['usuario'];
    model.clave= this.form.value['clave'];

    this.loadingService.openLoading();

    this.loadingService.closeLoading();
    // if(model.nIdCliente==null || model.clave=="" || model.usuario==""){
      // if(model.nIdCliente==null || model.clave==""){
      //   this.notifierService.showNotification(2,'Mensaje','Ingresa el cliente y la contraseña');
      // }
      // else{
      //   this.notifierService.showNotification(2,'Mensaje','Ingresa un nombre o acrónimo para identificarse en la encuesta');
      // }
      // this.spinner.hideLoading();

    // }else{

      // this.spinner.showLoading();
      // this.usuarioService.login(model).subscribe(data=>{
  
      //   // if(data.typeResponse==environment.EXITO){
      //   //   localStorage.setItem(environment.TOKEN_NAME, data.access_token!);
      //   //   localStorage.setItem('first-time-login', 'true');
  
      //     this.router.navigate(['/page/inicio']);
      //   // }
              
      //   // this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);
      //   // this.spinner.hideLoading();
      // }); 

      // this.router.navigate(['inicio']);

    // }
  }

  registrarPersona(){
    this.router.navigate(['crearpersona']);
  }
}
