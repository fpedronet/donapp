export class Geolocalizacion{
    constructor(){
        this.api = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2';
    }
    //Entrada
    api?: string;
    lat?: number = 0;
    lng? : number = 0;
    //Salida
    vDpto? : string = '';
    vProv? : string = '';
    idDpto?: string = "00";
    idProv? : string = "0000";
}