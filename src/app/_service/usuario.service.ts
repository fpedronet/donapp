import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '../_model/response';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { GoogleUsuario, TokenUsuario, Usuario } from '../_model/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.UrlApi}/usuario`;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  loginMobil(usuario: Usuario){
    let urls = `${this.url}/PostLogin`;

    return this.http.post<TokenUsuario>(urls, usuario);
  }

  loginGoogle(usuario: Usuario){
    let urls = `${this.url}/PostValidarUsuarioGoogle`;

    return this.http.post<TokenUsuario>(urls, usuario);
  }

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

      let split = token.split("|");

      model.email= split[0];
      model.givenName= split[1];
      model.familyName= split[2];
      model.imageUrl= split[3];
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
