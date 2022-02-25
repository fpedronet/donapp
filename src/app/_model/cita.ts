import { Banco } from "./banco";
import { Campana } from "./campana";

export class Cita{
    nIdCita?: number;    
    nIdBanco? : number;
    nIdCampana? : number;
    nIdDonante? : number;
    dProgramacion? : Date;
    nTipoCita? : number;
    nTipoDonacion? : number;
    vIdReceptor? : string;
    listaBancos? : Banco[] = [];
    listaCampanas? : Campana[] = [];
    //Parámetros para configurar calendario
    nCitaHorasMin? : number = 2; //Cantidad de tiempo mínimo para reservar una cita
    nCitaHorasMax? : number = 24*30; //Cantidad de tiempo máximo para reservar una cita
}