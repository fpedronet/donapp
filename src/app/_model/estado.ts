export class Estado {
    constructor(_nIdEstado?: number, _vDescripcion?: string, _vDetalle?: string, _vMensaje?: string, _visual?: boolean) {
        this.nIdEstado = _nIdEstado;
        this.vDescripcion = _vDescripcion;
        this.vDetalle = _vDetalle;
        this.vMensaje = _vMensaje;
        this.visual = _visual;
        this.isChecked = true;
    }
    nIdEstado?: number;
    vDescripcion?: string;
    vDetalle?: string;
    vMensaje?: string
    icon?: string;
    color?: string;
    visual?: boolean;
    isChecked?: boolean;
}