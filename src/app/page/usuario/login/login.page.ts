import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../../components/loading/loading.service';

import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';

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
      'vUsuario': new FormControl(''),
      'vContrasena': new FormControl('')
    });
  }

  login(){
debugger;
    let model = new Usuario();

<<<<<<< HEAD
    model.vUsuario = this.form.value['vUsuario'];
    model.vContrasena= this.form.value['vContrasena'];
=======
    //model.nIdUsuario = this.form.value['nIdUsuario'];
    model.vUsuario = this.form.value['vUsuario'];
    model.vContrasena = this.form.value['vContrasena'];
>>>>>>> c63f72729a8f69f949c19e2113f1f85adc329059

    this.loadingService.openLoading();

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
      this.usuarioService.login(model).subscribe(data=>{
  debugger;
        if(data.typeResponse==environment.EXITO){
          localStorage.setItem(environment.TOKEN_NAME, data.access_token!);
            
          this.router.navigate(['inicio']);
        }
              
        // this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);
        this.loadingService.closeLoading();
      }); 

      // this.router.navigate(['inicio']);

    // }
  }

  registrarPersona(){
    this.router.navigate(['crearpersona']);
  }
}
