export default class Paciente{
    public id: number;
    public nombre: string;
    public especie: string;
    public dueno: number;
    constructor(nombre:string, especie:string, dueno:number, id:number){
        this.nombre = nombre;
        this.especie = especie;
        this.dueno = dueno;
        this.id = id;
    }
}