import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { dataCollection } from '../_model/dataCollection';

import { Persona } from '../_model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  private url: string = `${environment.UrlApi}/persona`;
  
  listar(data: string, page: number,pages: number) {

    let href = `${this.url}/GetAllPersona`;
    let urls = `${href}?data=${data}&page=${page+1}&pages=${pages}`;

    return this.http.get<dataCollection>(urls);
  }

  obtener(id: number){
    let urls = `${this.url}/GetFirstPersona?id=${id}`;
    return this.http.get<Persona>(urls);
  }

  guardar(persona: Persona){
    let urls = `${this.url}/PostSavePersona`;
    return this.http.post<Response>(urls, persona);
  }
}
