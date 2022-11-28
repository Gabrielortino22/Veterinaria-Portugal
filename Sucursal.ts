import Paciente from "./Paciente";
import Cliente from './Cliente';
import * as readlineSync from 'readline-Sync';
import GestorDeArchivos from './gestorDeArchivos';

export default class Sucursal{
    private nombre: string;
    private direccion: string;
    private id: number;
    private listaDeClientes = new Array<Cliente>;
    private listaDePacientes = new Array<Paciente>;
    private entrada: number;

    constructor(nombre:string, direccion:string, id:number){
        this.nombre = nombre;
        this.direccion = direccion;
        this.id = id;
    };

    public altaCliente(){
        let nombre: string = readlineSync.question("Ingrese el nombre del cliente: ");
        let telefono: number = Number(readlineSync.question("Ingrese el telefono del cliente: "));
        let id: number = this.generarId();
        let nuevoCliente: Cliente = new Cliente(nombre,telefono,id);
        this.listaDeClientes.push(nuevoCliente);
    };
    public bajaCliente(){
        let id: number = Number(readlineSync.question("Ingrese el ID del cliente que desea borrar: "));
        let idValidada: boolean = false;
        for(let i = 0; i < this.listaDeClientes.length; i++){
            if(id === this.listaDeClientes[i].id){
                idValidada = true;
                this.listaDeClientes.splice(i,1);
                console.log("Cliente eliminado del sistema.");
                break;
            };
        };
        if(idValidada === false){
            console.log("El ID introducido no existe.");            
        };
    };
    public modificarCliente(){
        let id: number = Number(readlineSync.question("Ingrese el ID del cliente que desea modificar: "));
        let idValidada: boolean = false;
        for(let i = 0; i < this.listaDeClientes.length; i++){
            if(id === this.listaDeClientes[i].id){
                idValidada = true;
                this.listaDeClientes[i].nombre = readlineSync.question("Ingrese el nuevo nombre del cliente: ");
                this.listaDeClientes[i].telefono = Number(readlineSync.question("Ingrese el nuevo telefono del cliente: "));
                let respuesta: string = readlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
                if (respuesta.toLocaleLowerCase() === "si"){
                    this.listaDeClientes[i].id = this.generarId();
                };
                console.log("Cliente modificado.");
                break;
            };
        };
        if(idValidada === false){
            console.log("El ID introducido no existe.");            
        };
    };
    public verClientes(){
        for(let i = 0; i < this.listaDeClientes.length; i++){
            if(isNaN(this.listaDeClientes[i].id) === false){
                console.log(`ID: ${this.listaDeClientes[i].id};   Nombre: ${this.listaDeClientes[i].nombre};  Telefono: ${this.listaDeClientes[i].telefono};  Visitas: ${this.listaDeClientes[i].numeroDeVisitas};    VIP: ${this.listaDeClientes[i].esVip};`);
            };
        };
    };

    public altaPaciente(){
        let id: number = this.generarIdPaciente();
        let nombre: string = readlineSync.question("Ingrese el nombre del paciente: ");
        let especie: string;
        let respuesta: string = readlineSync.question("Ingrese la especie del paciente: ");
        if (respuesta.toLocaleLowerCase() === "perro"){
            especie = "perro";
        }
        else if(respuesta.toLocaleLowerCase() === "gato"){
            especie = "gato";
        }
        else{
            especie = `exotica(${respuesta})`;
        };
        let dueno: number = Number(readlineSync.question("Ingrese el ID del dueno: "));
        let duenoValidado: boolean = false;
        while(duenoValidado === false){
            for(let i = 0; i < this.listaDeClientes.length; i++){
                if(dueno === this.listaDeClientes[i].id){
                    this.listaDeClientes[i].numeroDeVisitas = this.listaDeClientes[i].numeroDeVisitas + 1;
                    this.listaDeClientes[i].comprobarVip();
                    duenoValidado = true;
                };
            };
            if(duenoValidado === false){
                dueno = Number(readlineSync.question("ID invalida, ingrese la ID nuevamente: "));
            };
        };
        let nuevoPaciente: Paciente = new Paciente(nombre,especie,dueno,id);
        this.listaDePacientes.push(nuevoPaciente);
    };
    public bajaPaciente(){
        let id: number = Number(readlineSync.question("Ingrese la ID del paciente que desea eliminar:"));
        let idValidada: boolean = false;
        for(let i = 0; i < this.listaDePacientes.length; i++){
            if(id === this.listaDePacientes[i].id){
                idValidada = true;
                this.listaDePacientes.splice(i,1);
                console.log("Paciente eliminado del sistema.");
                break;
            };
        };
        if(idValidada === false){
            console.log("El ID introducido no existe.");            
        };
    };
    public modificarPaciente(){
        let id: number = Number(readlineSync.question("Ingrese el ID del paciente que desea modificar: "));
        let idValidada: boolean = false;
        for(let i = 0; i < this.listaDePacientes.length; i++){
            if(id === this.listaDePacientes[i].id){
                idValidada = true;
                this.listaDePacientes[i].nombre = readlineSync.question("Ingrese el nuevo nombre del paciente: ");
                
                let especie: string;
                let respuesta: string = readlineSync.question("Ingrese la especie del paciente: ");
                if (respuesta.toLocaleLowerCase() === "perro"){
                    especie = "perro";
                }
                else if(respuesta.toLocaleLowerCase() === "gato"){
                    especie = "gato";
                }
                else{
                    especie = `exotica (${respuesta})`;
                };
                this.listaDePacientes[i].especie = especie;

                let respuestaId: string = readlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
                if (respuestaId.toLocaleLowerCase() === "si"){
                    this.listaDePacientes[i].id = this.generarIdPaciente();
                };
                console.log("Paciente modificado.");
                break;
            };
        };

        if(idValidada === false){
            console.log("El ID introducido no existe.");            
        };
    };
    public verPacientes(){
        for(let i = 0; i < this.listaDePacientes.length; i++){
            if(isNaN(this.listaDePacientes[i].dueno) === false){
                console.log(`ID: ${this.listaDePacientes[i].id};   Dueno: ${this.listaDePacientes[i].dueno};  Nombre: ${this.listaDePacientes[i].nombre};  Especie: ${this.listaDePacientes[i].especie}`);
            };
        };
    };

    //Este metodo es una especie de menu para llamar otros metodos
    public ejecutar(){
        while(this.entrada !== 0){
            this.entrada = Number(readlineSync.question("<VETERINARIAS LISBOA> Ingrese un numero para... Clientes: 1 ver, 2 agregar, 3 editar, 4 borrar. Pacientes: 5 ver, 6 agregar, 7 editar, 8 borrar. 0 para salir."));
            switch (this.entrada){
                case 1:
                    this.verClientes();
                    break;
                case 2:
                    this.altaCliente();
                    break;
                case 3:
                    this.modificarCliente();
                    break;
                case 4:
                    this.bajaCliente();
                    break;
                case 5:
                    this.verPacientes();
                    break;
                case 6:
                    this.altaPaciente();
                    break;
                case 7:
                    this.modificarPaciente();
                    break;
                case 8:
                    this.bajaPaciente();
                    break;
                case 0:
                    break;
                default:
                    console.log("Entrada no valida.")
            };
        };
    };
    public generarId(): number{
        //el primer 10000 es para asegurarse de que el id empieze en 1
        let id: number = 10000 + Math.floor(Math.random() * 10000);
        let idValidada: boolean = false;
        let idRepetida: boolean;
        while(idValidada === false){
            idRepetida = false;
            for(let i = 0; i < this.listaDeClientes.length; i++){
                if(id === this.listaDeClientes[i].id){
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
    public generarIdPaciente(): number{
        //el primer 40000 es para asegurarse de que el id empieze en 1
        let id: number = 40000 + Math.floor(Math.random() * 10000);
        let idValidada: boolean = false;
        let idRepetida: boolean;
        while(idValidada === false){
            idRepetida = false;
            for(let i = 0; i < this.listaDePacientes.length; i++){
                if(id === this.listaDePacientes[i].id){
                    idRepetida = true;
                };
            };
            if(idRepetida === false){
                idValidada = true;
            }
            else{
                id = 40000 + Math.floor(Math.random() * 10000);
            };
        };
        return id;
    };

    //Los siguientes dos metodos son para cargar los clientes y pacientes iniciales
    public cargarClientes(){
        let datos: GestorDeArchivos = new GestorDeArchivos("datosClientes.txt");        

        for (let i: number = 0; i < datos.getArregloString().length; i++) {
            let atributosCliente = datos.getArregloString()[i].split(',')
            let nombre: string = atributosCliente[0];
            let telefono: number = Number(atributosCliente[1]);
            let id: number = this.generarId();
            let nuevoCliente = new Cliente(nombre,telefono,id);
            this.listaDeClientes.push(nuevoCliente);
            };
    };
    public cargarPacientes(){
        let datos: GestorDeArchivos = new GestorDeArchivos("datosPacientes.txt");        

        for (let i: number = 0; i < datos.getArregloString().length; i++) {
            let atributosPaciente = datos.getArregloString()[i].split(',')
            let nombre: string = atributosPaciente[0];
            let especie: string = atributosPaciente[1];
            let id: number = this.generarIdPaciente();
            //el indice es un numero aleatorio dentro del rango del array de clientes para que los pacientes se distribuyan
            let indice: number = Math.floor(Math.random() * this.listaDeClientes.length);
            let idDueno: number = this.listaDeClientes[indice].id;
            let nuevoPaciente = new Paciente(nombre,especie,idDueno,id);
            this.listaDePacientes.push(nuevoPaciente);
            this.listaDeClientes[indice].numeroDeVisitas = this.listaDeClientes[indice].numeroDeVisitas + 1;
            this.listaDeClientes[indice].comprobarVip();
            };
    };
};

let SucursalAyacucho: Sucursal = new Sucursal("Coimbra","San Martin 1230",214124);
SucursalAyacucho.cargarClientes();
SucursalAyacucho.cargarPacientes();
SucursalAyacucho.ejecutar();
