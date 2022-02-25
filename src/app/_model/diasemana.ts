export class DiaSemana {
    constructor(_nIdDiaSemana?: number, _vDescripcion?: string, _vAbrev?: string) {
        this.nIdDiaSemana = _nIdDiaSemana;
        this.vDescripcion = _vDescripcion;
        this.vAbrev = _vAbrev;
    }
    nIdDiaSemana?: number;
    vDescripcion?: string;
    vAbrev?: string;
}