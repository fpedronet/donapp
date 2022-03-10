export class TipoCita {
    constructor(_nIdTipoCita?: number, _vDescripcion?: string, _visual?: boolean) {
        this.nIdTipoCita = _nIdTipoCita;
        this.vDescripcion = _vDescripcion;
        this.visual = _visual;
        this.isChecked = true;
    }
    nIdTipoCita?: number;
    vDescripcion?: string;
    visual?: boolean;
    isChecked?: boolean;
}