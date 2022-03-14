import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { dataCollection } from '../_model/dataCollection';
import { Parametro } from '../_model/parametro';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http: HttpClient) { }

  private url: string = `${environment.UrlApi}/parametro`;

  listar() {

    let url = `${this.url}/GetAllParametro`;

    return this.http.get<Parametro>(url);
  }

  obtener(par: string){
    var val = undefined
    this.listar().subscribe(data=>{
      val = data[par];
    });
  }
}
