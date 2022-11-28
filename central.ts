import * as ReadlineSync from 'readline-sync';
import Sucursal from "./Sucursal";
import Proovedor from "./Proovedor";
import GestorDeArchivos from "./gestorDeArchivos";

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
    let id: number = Number(ReadlineSync.question("Ingrese el ID de la sucursal que desea borrar: "));
    let idValidada: boolean = false;
    for(let i = 0; i < this.listaSucursales.length; i++){
        if(id === this.listaSucursales[i].id){
            idValidada = true;
            this.listaSucursales.splice(i,1);
            console.log("La sucursal ha sido eliminada del sistema.");
            break;
        };
    };
    if(idValidada === false){
        console.log("El ID introducido no existe.");            
    };
};
     

public altaSucursal(){

    let nombre : string = ReadlineSync.question("Ingrese el nombre de la sucursal: ");
    let direccion:string = ReadlineSync.question("Ingrese la direccion de la sucursal:")
    let id: number = this.generarId();
    let nuevaSucursal : Sucursal = new Sucursal(nombre, direccion, id);
    this.listaSucursales.push(nuevaSucursal);

    console.log(this.listaSucursales);
}

public modificarSucursal(){
   
       let id: number = Number(ReadlineSync.question("Ingrese la id de la sucursal que desea modificar:"));
       let idValidada: boolean = false;
       for(let i = 0; i < this.listaSucursales.length; i++){
           if(id === this.listaSucursales[i].id){
               idValidada = true;
               this.listaSucursales[i].nombre = ReadlineSync.question("Ingrese el nuevo nombre de la sucursal: ");
               this.listaSucursales[i].direccion = (ReadlineSync.question("Ingrese la nueva direccion: "));
               let respuesta: string = ReadlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
               if (respuesta.toLocaleLowerCase() === "si"){
                   this.listaSucursales[i].id = this.generarId();
               };
               console.log("Sucursal modificada");
               break;
           };
       };
       if(idValidada === false){
           console.log("El ID introducido no existe.");            
       };
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
    let id: number = Number(ReadlineSync.question("Ingrese el ID del proovedor que desea borrar: "));
 let idValidada: boolean = false;
 for(let i = 0; i < this.listaProovedores.length; i++){
     if(id === this.listaProovedores[i].id){
         idValidada = true;
         this.listaProovedores.splice(i,1);
         console.log("Proovedor eliminado del sistema.");
         break;
     };
 };
 if(idValidada === false){
     console.log("El ID introducido no existe.");            
 };
};

     

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
    let id: number = Number(ReadlineSync.question("Ingrese el ID del proovedor que desea modificar: "));
let idValidada: boolean = false;
for(let i = 0; i < this.listaProovedores.length; i++){
    if(id === this.listaProovedores[i].id){
        idValidada = true;
        this.listaProovedores[i].nombre = ReadlineSync.question("Ingrese el nuevo nombre del provedor: ");
        this.listaProovedores[i].telefono = Number(ReadlineSync.question("Ingrese el nuevo telefono del proovedor: "));
        let respuesta: string = ReadlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
        if (respuesta.toLocaleLowerCase() === "si"){
            this.listaProovedores[i].id = this.generarId();
        };
        console.log("Proovedor modificado.");
        break;
    };
};
if(idValidada === false){
    console.log("El ID introducido no existe.");            
};
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
let SucursalAyacucho: Sucursal = new Sucursal("Coimbra","San Martin 1230",214124);
cargarProovedores();
 ejecutar();

