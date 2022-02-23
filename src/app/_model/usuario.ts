export class Usuario{
    nIdUsuario?: number;
    vUsuario? : string;
    vContrasena? : string;
    vVerifContra? : string;
    vIdenGmail?: string;
    vIdenFacebook?: string;
    nCorreoVerif?: number;
    dFechaRegistro?: Date;
    dFechaUltSesion?: Date;
}
export class TokenUsuario{
    idUsuario?: number;
    usuario? : string;
    tipoDocu? : string;
    documento? : string;
    nombres?: string;
    apPaterno?: string;
    apMaterno?: string;
    nCorreoVerif?: number;
    access_token? : string;
    typeResponse? : number;
    message? : string;
}