import { HorarioAtencion } from "./horarioatencion";

export class Banco{
    nIdBanco?: number;
    vDescripcion? : string;
    nCapMaximaIntervalo?: number;
    vCoordenadas? : string;
    vDireccion? : string;
    vUbigeo? : string;
    nDistancia?: number;
    vAtenLu? : string;
    vAtenMa? : string;
    vAtenMi? : string;
    vAtenJu? : string;
    vAtenVi? : string;
    vAtenSa? : string;
    vAtenDo? : string;
    listaAten? : string[] = [];
    listaHorarios?: HorarioAtencion[] = [];
}