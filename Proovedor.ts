export default class Proovedor {
    public nombre: string;
    public id: number;
    public telefono: number;
     
    
    public constructor(nombre:string, telefono:number, id:number){
        this.nombre = nombre;
        this.id = id;
        this.telefono = telefono;
    }    
    };