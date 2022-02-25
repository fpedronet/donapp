import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  private url: string = `${environment.UrlApi}/email`;

  verificar(email: string){
    let urls = `${this.url}/GetValidarUsuario?email=${email}`;
    return this.http.get<string>(urls);
  }
  
}
