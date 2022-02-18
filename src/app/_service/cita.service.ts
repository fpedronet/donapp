import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { Cita } from '../_model/cita';
import { dataCollection } from '../_model/dataCollection';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private http: HttpClient) { }

  private url: string = `${environment.UrlApi}/cita`;

  listar(data: string, page: number, pages: number) {

    let href = `${this.url}/GetAllCita`;
    let urls = `${href}?data=${data}&page=${page+1}&pages=${pages}`;

    return this.http.get<dataCollection>(urls);
  }

  obtener(id: number){
    let urls = `${this.url}/GetFirstCita?id=${id}`;
    return this.http.get<Cita>(urls);
  }

  guardar(model: Cita){
    let urls = `${this.url}/PostSaveCita`;
    return this.http.post<Response>(urls, model);
  }
}
