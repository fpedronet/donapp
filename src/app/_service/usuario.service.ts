import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '../_model/response';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { GoogleUsuario, TokenUsuario, Usuario } from '../_model/usuario';
import { EncrDecrService } from './encr-decr.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth,signInWithPopup,GoogleAuthProvider, signOut } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.UrlApi}/usuario`;
  // private user: Observable<firebase.default | null >;
  
  constructor(
    public afAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
    private EncrDecr: EncrDecrService,
  ) { 
    this.afAuth.authState.subscribe(userResponse => {
      if (userResponse) {
        localStorage.setItem('user', JSON.stringify(userResponse));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  loginMobil(usuario: Usuario){
    let urls = `${this.url}/PostLogin`;

    return this.http.post<TokenUsuario>(urls, usuario);
  }

  loginGoogle(usuario: Usuario){
    let urls = `${this.url}/PostValidarUsuarioGoogle`;

    return this.http.post<TokenUsuario>(urls, usuario);
  }

  async  loginWithGoogle() {
    return await this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }

  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }
  // // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new GoogleAuthProvider());
  // }
  // // Auth logic to run auth providers
  // AuthLogin(provider) {
  //   debugger;
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       debugger;
  //       console.log('You have been successfully logged in!');
  //     })
  //     .catch((error) => {
  //       debugger;
  //       console.log(error);
  //     });
  // }


  sessionUsuario(){
    let helper = new JwtHelperService();
    let token = localStorage.getItem(environment.TOKEN_NAME);

    if (!helper.isTokenExpired(token!)){

      let decodedToken = helper.decodeToken(token!);      
      return decodedToken;
    }else{
      return null;
    }
  }

  sessionGoogle(){
    let model = new GoogleUsuario();
    let token = localStorage.getItem(environment.TOKEN_GOOGLE);

    if(token!=null&& token!="" && token!=undefined){

      let key = this.EncrDecr.get(token);

      let split = key.split("|");

      model.email= split[0];
      model.nombre= split[1];

      let apellidoSplit = split[2];
      let apellido = apellidoSplit.split(' ');

      model.apePaterno= apellido[0];
      model.apeMaterno= (apellido.length == 2)? apellido[1] : (apellido[1]+ " " + apellido[2]);

      model.verifcado= split[3];
    }

    return model;
  }

  
  closeLogin(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  verificarCorreo(usuario: Usuario){
    //debugger;
    let urls = `${this.url}/PostValidarCorreo`;
    return this.http.post<Response>(urls, usuario);
  }

}
