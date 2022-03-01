import { Banco } from "./banco";
import { Campana } from "./campana";
import { pagination } from "./pagination";

export class Cita{
    nIdCita?: number;    
    nIdBanco? : number;
    nIdCampana? : number;
    nIdDonante? : number;
    dProgramacion? : Date;
    fechaProgramada? : string;
    vBanco? : string;
    vTipoCita? : string;
    vTipoDonacion? : string;
    vIcon? : string;
    nTipoCita? : number;
    nTipoDonacion? : number;
    vIdReceptor? : string;
    listaBancos? : Banco[] = [];
    listaCampanas? : Campana[] = [];
    //Parámetros para configurar calendario
    nCitaHorasMin? : number = 2; //Cantidad de tiempo mínimo para reservar una cita
    nCitaHorasMax? : number = 24*30; //Cantidad de tiempo máximo para reservar una cita
    dRegistro? : Date;
}

export class CitaRequest{
    data?: string;    
    listaTipocita?: number[] = [];
    listTipodonacion?: number[] = [];
    page?: number;
    pages?: number ;
    column?: string;
    order?: string;
}