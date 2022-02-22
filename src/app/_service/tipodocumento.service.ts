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
    let href = `${this.url}/GetAllTipoIdentidad`;
    let urls = `${href}`;
    
    try{
      return this.http.get<dataCollection>(urls);
    }
    catch{
      return undefined
    }
    
  }
}
