export default class Paciente{
    public nombre: string;
    public especie: string;
    public dueno: number;
    constructor(nombre:string, especie:string, dueno:number){
        this.nombre = nombre;
        this.especie = especie;
        this.dueno = dueno;
    }
}