import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GoogleAuth} from '@codetrix-studio/capacitor-google-auth';
import { environment } from 'src/environments/environment';

import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { LoadingService } from '../components/loading/loading.service';
import { EncrDecrService } from 'src/app/_service/encr-decr.service';
import { ToastService } from '../components/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private usuarioService : UsuarioService,
    private loadingService : LoadingService,
    private EncrDecr: EncrDecrService,
    private toastService : ToastService,

  ) { }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['login']);
  }

  registrarPersona(){
    this.router.navigate(['cpersona']);
  }

  googleSignup(){

    const googleUser =GoogleAuth.signIn().then(
      (res) =>{
        let model = new Usuario();

        model.vUsuario = res.email;
        model.tipologeo = "gmail";

        this.loadingService.openLoading();
        this.usuarioService.loginGoogle(model).subscribe(data=>{
 
          let google = res.email+"|"+res.givenName+"|"+res.familyName+"|"+1;

          let key = this.EncrDecr.set(google);

          localStorage.setItem(environment.TOKEN_GOOGLE, key);

          if(data.typeResponse==environment.EXITO){

            localStorage.setItem(environment.TOKEN_NAME, data.access_token!);
              
            this.router.navigate(['inicio']);

            this.loadingService.closeLoading();
            this.toastService.showNotification(data.typeResponse!,'Mensaje',data.message!);

          }else{
            this.loadingService.closeLoading();
            this.router.navigate(['cpersona']);
          }  

        });
      },
      (error) =>{
        console.log("error sss = " + error);
      }
    );
  }

}
