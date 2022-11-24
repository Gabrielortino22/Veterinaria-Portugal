import * as ReadlineSync from 'readline-sync';
import Sucursal from "./Sucursal";
import Proovedor from "./Proovedor";
import GestorDeArchivos from './gestorDeArchivos';

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
public  cargarSucursales(){
    
        let datos: GestorDeArchivos = new GestorDeArchivos("datosSucursal.txt");        
      
          for (let i: number = 0; i < datos.getArregloString().length; i++) {
              let atributosSucursales = datos.getArregloString()[i].split(',')
              let nombre: string = atributosSucursales[0];
              let direccion:string =atributosSucursales[1];
              let id: number = Number(atributosSucursales[2]);

              let nuevaSucursal : Sucursal = new Sucursal(nombre, direccion, id);
            this.listaSucursales.push(nuevaSucursal);
              };
      };
    
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
   
       let posicion: number = Number(ReadlineSync.question("Ingrese la posicion de la sucursal que desea modificar:"));
       this.listaSucursales[posicion].nombre = ReadlineSync.question("Ingrese el nuevo nombre de la sucursal: ");
        this.listaSucursales[posicion].direccion = Number(ReadlineSync.question("Ingrese la nueva direccion de la sucursal: "));
        let respuesta: string = ReadlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
        if (respuesta.toLocaleLowerCase() === "si"){
            this.listaSucursales[posicion].id = this.generarId();
        }
    };
     

    public verSucursal(){
        console.log(this.listaSucursales)
    };


//FUNCIONES PARA PROOVEDORES
public cargarProovedores(){
  let datos: GestorDeArchivos = new GestorDeArchivos("datosProovedores.txt");        

    for (let i: number = 0; i < datos.getArregloString().length; i++) {
        let atributosProovedores = datos.getArregloString()[i].split(',')
        let nombre: string = atributosProovedores[0];
        let telefono: number = Number(atributosProovedores[1]);
        let id: number = Number(atributosProovedores[2]);
         
        let nuevoProovedor : Proovedor = new Proovedor(nombre, telefono, id);
        this.listaProovedores.push(nuevoProovedor);  
        };
};

    

 public bajaProovedor() {
    for (let i : number =0; i < this.listaProovedores.length; i++){  
        if (this.generarId() == this.listaProovedores[i].getId()){
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
    let posicion: number = Number(ReadlineSync.question("Ingrese la posicion del prooveedor que desea modificar:"));
       this.listaProovedores[posicion].nombre = ReadlineSync.question("Ingrese el nuevo nombre del proovedor: ");
        this.listaProovedores[posicion].telefono = Number(ReadlineSync.question("Ingrese el nuevo telefono del proovedor: "));
        let respuesta: string = ReadlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
        if (respuesta.toLocaleLowerCase() === "si"){
            this.listaProovedores[posicion].id = this.generarId();
        }
    };
     
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
