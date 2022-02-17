export class Usuario{
    nIdUsuario?: number;
    vContrasena? : string;
    vVerifContra? : string;
    vUsuario? : string;
}
export class TokenUsuario{
    idUsuario?: number;
    usuario? : string;
    tipoDocu? : string;
    documento? : string;
    nombres?: string;
    apPaterno?: string;
    apMaterno?: string;
    access_token? : string;
    typeResponse? : number;
    message? : string;
}