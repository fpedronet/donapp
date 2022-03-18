import { CitaRequest } from './../_model/cita';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { Cita } from '../_model/cita';
import { dataCollection } from '../_model/dataCollection';
import { HistorialResumen } from '../_model/historialresumen';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private http: HttpClient) { }

  private url: string = `${environment.UrlApi}/cita`;

  listar(model: CitaRequest) {
    let urls = `${this.url}/GetAllCita`;

    return this.http.post<dataCollection>(urls,model);
  }

  obtenerResumen(donante: number = 0){
    let urls = `${this.url}/GetHistorialResumen?donante=${donante}`;
    return this.http.get<HistorialResumen>(urls);
  }

  obtener(id: number, tipo: number){
    let urls = `${this.url}/GetFirstCita?id=${id}&tipo=${tipo}`;
    return this.http.get<Cita>(urls);
  }

  guardar(model: Cita){
    let urls = `${this.url}/PostSaveCita`;
    return this.http.post<Response>(urls, model);
  }

  eliminar(id: number, inverso: number = 0){
    let urls = `${this.url}/DeleteCita?id=${id}&inverso=${inverso}`;
    return this.http.delete<Response>(urls);
  }

  desconfirmar(id: number){
    let urls = `${this.url}/DesconfirmarCita?id=${id}`;
    return this.http.delete<Response>(urls);
  }
}
