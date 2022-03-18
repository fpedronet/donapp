export class HistorialResumen {
    constructor(){
        this.diaProgramado = '';
        this.fechaProgramada = '--/--/----';
        this.nTotDonaciones = 0;
        this.nTotSangre = 0;
        this.nTotPlaqueta = 0;
        this.nVidasSalvadas = 0;
    }

    nTotDonaciones? : number;

    dProgramado? : Date;
    diaProgramado? : string;
    fechaProgramada? : string;

    nTotSangre? : number;
    nTotPlaqueta? : number;

    nVidasSangre? : number=3;
    nVidasPlaqueta? : number=2;

    nVidasSalvadas? : number;
}