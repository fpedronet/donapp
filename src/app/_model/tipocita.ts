export class TipoCita {
    constructor(_nIdTipoCita?: number, _vDescripcion?: string) {
        this.nIdTipoCita = _nIdTipoCita;
        this.vDescripcion = _vDescripcion;
    }
    nIdTipoCita?: number;
    vDescripcion?: string;
}