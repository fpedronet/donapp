export class HorarioAtencion {
    constructor(_nDia?: number, _vHoraIni1?: string, _vHoraFin1?: string, _vHoraIni2?: string, _vHoraFin2?: string) {
        this.nDia = _nDia;
        this.vHoraIni1 = _vHoraIni1;
        this.vHoraFin1 = _vHoraFin1;
        this.vHoraIni2 = _vHoraIni2;
        this.vHoraFin2 = _vHoraFin2;
    }
    nIdHorario?: number;
    nIdBanco?: number;
    nDia?: number;
    vHoraIni1?: string;
    vHoraFin1?: string;
    vHoraIni2?: string;
    vHoraFin2?: string;
}