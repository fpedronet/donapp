import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { TokenUsuario, Usuario } from '../_model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.UrlApi}/usuario`;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(usuario: Usuario){
    let urls = `${this.url}/PostLogin`;

    return this.http.post<TokenUsuario>(urls, usuario);
  }

  isLogin() {
    let token = localStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  // sessionUsuario(){
  //   let helper = new JwtHelperService();
  //   let token = localStorage.getItem(environment.TOKEN_NAME);

  //   if (!helper.isTokenExpired(token!)){

  //     let decodedToken = helper.decodeToken(token!);      
  //     return decodedToken;
  //   }else{
  //     return null;
  //   }
  // }

  closeLogin(){
    localStorage.clear();
    this.router.navigate(['']);
  }

}
