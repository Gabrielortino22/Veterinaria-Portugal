import * as ReadlineSync from 'readline-sync';
import Sucursal from "./Sucursal"
import Proovedor from "./Proovedor"
class Central {
    private listaSucursales:Array<Sucursal>;
    private listaProovedores:Array<Proovedor>;
    private entrada:number;
    public constructor (listaSucursales:Array<Sucursal>, listaProovedores:Array<Proovedor>){
      this.listaSucursales = listaSucursales;
      this.listaProovedores = listaProovedores;  

    }
    public getlistaSucursales(){
        return this.listaSucursales
    }
    public getListaProovedores(){
    return this.listaProovedores
}




//FUNCIONES PARA SUCURSALES
public  cargarSucursales(listaSucursales: Array<Sucursal> ,sucursal:string) : Array<Sucursal>{
    let datos: string[]  = sucursal.split(',');
   let nombre : string = datos[0];
   let direccion: string = datos[1]
   let id : number = Number(datos[2]);

    let nuevaSucursal : Sucursal = new Sucursal(nombre, direccion, id);
    listaSucursales.push(nuevaSucursal);

    return listaSucursales;
}

public bajaSucursal() {
    for (let i : number =0; i < this.listaSucursales.length; i++){  
        if (this.generarId() == this.listaSucursales[i].getId()){
            this.listaSucursales.splice(i, 1);
            console.log("La sucursal ha sido eliminada");
        }
    }
}

public altaSucursal(){

    let nombre : string = ReadlineSync.question("Ingrese el nombre de la sucursal: ");
    let direccion:string = ReadlineSync.question("Ingrese la direccion de la sucursal:")
    let id: number = this.generarId();
      

    let nuevaSucursal : Sucursal = new Sucursal(nombre, direccion, id);

    this.listaSucursales.push(nuevaSucursal);

    console.log(this.listaSucursales);
}

public modificarSucursal(){
   
    let nombre: string = ReadlineSync.question("Ingrese el nombre modificado: ");
    let id : number = ReadlineSync.questionInt("Ingrese la nueva id: ");
    let direccion:string=ReadlineSync.question("Ingrese la nueva direccion:") 

    let sucursalModificada : Sucursal = new Sucursal(nombre, direccion, id);

    delete this.listaSucursales[posicion];
    this.listaSucursales[posicion] = sucursalModificada;

    console.log(this.listaSucursales);
}
    public verSucursal(){
        console.log(this.listaSucursales)
    }


//FUNCIONES PARA PROOVEDORES
public cargarProovedores(listaProovedores: Array<Proovedor> ,proovedor:string) : Array<Proovedor>{
    let datos: string[]  = proovedor.split(',');
   let nombre : string = datos[0];
   let telefono: number = Number(datos[1]);
   let id : number = Number(datos[2]);

    let nuevoProovedor : Proovedor = new Proovedor(nombre, telefono, id);
   listaProovedores.push(nuevoProovedor);

    return listaProovedores;
}
 public bajaProovedor() {
    for (let i : number =0; i < this.listaProovedores.length; i++){  
        if (id == this.listaProovedores[i].getId()){
            this.listaProovedores.splice(i, 1);
            console.log("El proovedor ha sido eliminado");
        }
    }
}

public altaProovedor(){

    let nombre : string = ReadlineSync.question("Ingrese el nombre del proovedor: ");
    let telefono:number = ReadlineSync.question("Ingrese el telefono del proovedor:")
    let id: number = this.generarId();
     

    let nuevoProovedor : Proovedor = new Proovedor(nombre, telefono, id);

    this.listaProovedores.push(nuevoProovedor);

    console.log(this.listaProovedores);
}
public verProovedores(){
    console.log(this.listaProovedores)
}

public modificarProovedor() {
   
    let nombre: string = ReadlineSync.question("Ingrese el nombre del proovedor modificado: ");
    let id : number = ReadlineSync.questionInt("Ingrese la nueva id: ");
    let telefono:number=ReadlineSync.questionInt("Ingrese el nuevo telefono:") 

    let proovedorModificado : Proovedor = new Proovedor(nombre, telefono, id);

    delete this.listaProovedores[posicion];
    this.listaProovedores[posicion] = proovedorModificado;

    console.log(this.listaProovedores);
}
public  generarId(){
    //el primer 10000 es para asegurarse de que el id empieze en 1
    let id: number = 20000 + Math.floor(Math.random() * 20000);
    let idValidada: boolean = false;
    let idRepetida: boolean;
    while(idValidada === false){
        idRepetida = false;
        for(let i = 0; i < this.listaProovedores.length; i++){
            if(id === this.listaProovedores[i].id){
                idRepetida = true;
            };
        };
        if(idRepetida === false){
            idValidada = true;
        }
        else{
            id = 10000 + Math.floor(Math.random() * 10000);
        };
    };
    return id;
};

public  ejecutar(){
    while(this.entrada !== 0){
        this.entrada = Number(ReadlineSync.question("<VETERINARIAS LISBOA> Ingrese un numero para... Sucursales: 1 ver, 2 agregar, 3 editar, 4 borrar. Pacientes: 5 ver, 6 agregar, 7 editar, 8 borrar. 0 para salir."));
        switch (this.entrada){
            case 1:
                this.verSucursal();
                break;
            case 2:
                this.altaSucursal();
                break;
            case 3:
                this.modificarSucursal();
                break;
            case 4:
                this.bajaSucursal();
                break;
            case 5:
                this.verProovedores();
                break;
            case 6:
                this.altaProovedor();
                break;
            case 7:
                this.modificarProovedor();
                break;
            case 8:
                this.bajaProovedor();
                break;
            case 0:
                break;
            default:
                console.log("Entrada no valida.")
        };
    };
};
};
