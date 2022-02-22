import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../../components/loading/loading.service';

import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { ToastService } from '../../components/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private usuarioService : UsuarioService,
    private loadingService : LoadingService,   
    private toastService : ToastService
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

    let model = new Usuario();

    model.vUsuario = this.form.value['vUsuario'];
    model.vContrasena= this.form.value['vContrasena'].toLowerCase();

    if(model.vUsuario=="" || model.vContrasena==""){

      this.toastService.showNotification(2,'Mensaje','Ingresa usuario y contraseña');

    }else{

      this.loadingService.openLoading();
      this.usuarioService.login(model).subscribe(data=>{

        if(data.typeResponse==environment.EXITO){
          localStorage.setItem(environment.TOKEN_NAME, data.access_token!);
            
          this.router.navigate(['inicio']);
        }
            
        this.loadingService.closeLoading();
        this.toastService.showNotification(data.typeResponse!,'Mensaje',data.message!);

      }); 
    }
  }

  registrarPersona(){
    this.router.navigate(['cpersona']);
  }  
}
