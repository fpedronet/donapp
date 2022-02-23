export class TipoDonacion {
    constructor(_nIdTipoDonacion?: number, _vDescripcion?: string) {
        this.nIdTipoDonacion = _nIdTipoDonacion;
        this.vDescripcion = _vDescripcion;
    }
    nIdTipoDonacion?: number;
    vDescripcion?: string;
}