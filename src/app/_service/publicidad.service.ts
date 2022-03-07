import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { dataCollection } from '../_model/dataCollection';

@Injectable({
  providedIn: 'root'
})
export class PublicidadService {

  constructor(private http: HttpClient) { }

  private url: string = `${environment.UrlApi}/publicidads`;

  listar() {
    let urls = `${this.url}/GetAllPublicidad`;

    return this.http.get<dataCollection>(urls);
  }

}
