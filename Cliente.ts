export default class Cliente{
    public nombre: string;
    public id: number;
    public telefono: number;
    public esVip: boolean;
    public numeroDeVisitas: number;
    
    public constructor(nombre:string, telefono:number, id:number){
        this.nombre = nombre;
        this.id = id;
        this.telefono = telefono;
        this.esVip = false;
        this.numeroDeVisitas = 0;
    };
    public setcomprobarVip() :boolean {
    return this.esVip;
    };
    public comprobarVip(): void{
        if(this.numeroDeVisitas >= 5){
            this.esVip = true;
        };
    };
};