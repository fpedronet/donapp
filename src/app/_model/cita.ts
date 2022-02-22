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
}