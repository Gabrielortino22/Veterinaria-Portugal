import Paciente from "./Paciente";
import Cliente from "./Cliente";
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
        let pocision: number = Number(readlineSync.question("Ingrese la pocision del cliente que desea eliminar:"));
        delete this.listaDeClientes[pocision];
    };
    public modificarCliente(){
        let pocision: number = Number(readlineSync.question("Ingrese la pocision del cliente que desea modificar:"));
        this.listaDeClientes[pocision].nombre = readlineSync.question("Ingrese el nuevo nombre del cliente: ");
        this.listaDeClientes[pocision].telefono = Number(readlineSync.question("Ingrese el nuevo telefono del cliente: "));
        let respuesta: string = readlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
        if (respuesta.toLocaleLowerCase() === "si"){
            this.listaDeClientes[pocision].id = this.generarId();
        }
    };
    public verClientes(){
        console.log(this.listaDeClientes);
    };

    //En vez de introducir el id introducimos el indice del dueno asi automaticamente actualiza el numero de visitas y comprueba si es VIP
    public altaPaciente(){
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
            especie = `exotica (${respuesta})`;
        };
        let cliente: Cliente = this.listaDeClientes[readlineSync.question("Ingrese la pocision del dueno: ")];
        let dueno: number = cliente.id;
        let nuevoPaciente: Paciente = new Paciente(nombre,especie,dueno);
        this.listaDePacientes.push(nuevoPaciente);
        cliente.numeroDeVisitas = cliente.numeroDeVisitas + 1;
        cliente.comprobarVip();
    };
    public bajaPaciente(){
        let pocision: number = Number(readlineSync.question("Ingrese la pocision del paciente que desea eliminar:"));
        delete this.listaDePacientes[pocision];
    };
    public modificarPaciente(){
        let pocision: number = Number(readlineSync.question("Ingrese la pocision del Paciente que desea modificar:"));
        this.listaDePacientes[pocision].nombre = readlineSync.question("Ingrese el nuevo nombre del paciente: ");
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
        this.listaDePacientes[pocision].especie = especie;
    };
    public verPacientes(){
        console.log(this.listaDePacientes);
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
            let IndiceDueno: number = Number(atributosPaciente[2]);
            let nuevoPaciente = new Paciente(nombre,especie,IndiceDueno);
            this.listaDePacientes.push(nuevoPaciente);
            this.listaDeClientes[IndiceDueno].numeroDeVisitas = this.listaDeClientes[IndiceDueno].numeroDeVisitas + 1;
            this.listaDeClientes[IndiceDueno].comprobarVip();
            };
    };
};

let SucursalAyacucho: Sucursal = new Sucursal("Coimbra","San Martin 1230",214124);
SucursalAyacucho.cargarClientes();
SucursalAyacucho.cargarPacientes();
SucursalAyacucho.ejecutar();