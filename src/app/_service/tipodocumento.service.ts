import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { dataCollection } from '../_model/dataCollection';

import { TipoDocumento } from '../_model/tipodocumento';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {

  constructor(private http: HttpClient) { }

  private url: string = `${environment.UrlApi}/tipodocumento`;
  
  listar() {
    debugger;
    let href = `${this.url}/GetAllTipoDocumento`;
    let urls = `${href}`;

    return this.http.get<dataCollection>(urls);
  }
}
