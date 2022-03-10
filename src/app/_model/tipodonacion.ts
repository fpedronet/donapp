export class TipoDonacion {
    constructor(_nIdTipoDonacion?: number, _vDescripcion?: string, _visual?: boolean) {
        this.nIdTipoDonacion = _nIdTipoDonacion;
        this.vDescripcion = _vDescripcion;
        this.visual = _visual;
        this.isChecked = true;
    }
    nIdTipoDonacion?: number;
    vDescripcion?: string;
    visual?: boolean;
    isChecked?: boolean;
}