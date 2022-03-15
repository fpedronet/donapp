import { Usuario } from "./usuario";

export class Persona {
    nIdPersona?: number;
    nIdTipoDocu?: number;
    vDocumento?: string;
    vNombres?: string;
    vApPaterno?: string;
    vApMaterno?: string;
    dFechaNac?: Date;
    nSexo?: number;
    vTipoSangre?: string;
    nTalla?: number;
    nPeso?: number;
    vCelular?: string;
    vEmail?: string;
    vDireccion?: string;
    nSangreConfirmada?: number;
    nEsPaciente?: number;
    usuario?: Usuario;
}