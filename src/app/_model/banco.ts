import { HorarioAtencion } from "./horarioatencion";

export class Banco{
    nIdBanco?: number;
    vDescripcion? : string;
    nCapMaximaIntervalo?: number;
    vCoordenadas? : string;
    vDireccion? : string;
    vUbigeo? : string;
    nDistancia?: number;
    listaHorarios?: HorarioAtencion[] = [];
}