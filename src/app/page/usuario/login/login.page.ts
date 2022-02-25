import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../../components/loading/loading.service';

import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { ToastService } from '../../components/toast/toast.service';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

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
  ) { 
     GoogleAuth.initialize();
  }

  form: FormGroup = new FormGroup({});
  loading:any;
  userInfo = null;
  
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



  // googleSignup() {
  //   debugger;
  //   GoogleAuth.refresh().then((data) => {
  //     debugger;
  //     if (data.accessToken) {
  //       let navigationExtras: NavigationExtras = {
  //         state: {
  //           user: { type: 'existing', accessToken: data.accessToken, idToken: data.idToken }
  //         }
  //       };
  //       this.router.navigate(['cpersona'], navigationExtras);
  //     }
  //   }).catch(e => {
  //     if (e.type === 'userLoggedOut') {
  //       this.doLogin();
  //     }
  //   });

  //   this.doLogin();
  // }

  // async doLogin() {
  //   debugger;
  //   const user = await GoogleAuth.signIn();
  //   console.log(user);
  //   if (user) {
  //     this.goToHome(user);
  //   }
  // }

  // goToHome(user) {
  //   debugger;
  //   let navigationExtras: NavigationExtras = { state: { user: user } };
  //   this.router.navigate(['cpersona'], navigationExtras);
  // }






 googleSignup(){
    const googleUser = GoogleAuth.signIn().then(
      (res) =>{
        console.log("logueo = " + res);
        let google = res.email+"|"+res.name+"|"+res.familyName+"|"+res.givenName+"|"+res.imageUrl;
        localStorage.setItem(environment.TOKEN_GOOGLE, google!);
        this.router.navigate(['cpersona']);
      },
      (error) =>{
        debugger;
        console.log("error sss = " + error);
      }
    );

   this.userInfo = googleUser;
  }

  registrarPersona(){
    this.router.navigate(['cpersona']);
  }  
}
