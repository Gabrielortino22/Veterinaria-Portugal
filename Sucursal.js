"use strict";
exports.__esModule = true;
var Paciente_1 = require("./Paciente");
var Cliente_1 = require("./Cliente");
var readlineSync = require("readline-Sync");
var gestorDeArchivos_1 = require("./gestorDeArchivos");
var Sucursal = /** @class */ (function () {
    function Sucursal(nombre, direccion, id) {
        this.listaDeClientes = new Array;
        this.listaDePacientes = new Array;
        this.nombre = nombre;
        this.direccion = direccion;
        this.id = id;
    }
    ;
    Sucursal.prototype.altaCliente = function () {
        var nombre = readlineSync.question("Ingrese el nombre del cliente: ");
        var telefono = Number(readlineSync.question("Ingrese el telefono del cliente: "));
        var id = this.generarId();
        var nuevoCliente = new Cliente_1["default"](nombre, telefono, id);
        this.listaDeClientes.push(nuevoCliente);
    };
    ;
    Sucursal.prototype.bajaCliente = function () {
        var pocision = Number(readlineSync.question("Ingrese la pocision del cliente que desea eliminar:"));
        delete this.listaDeClientes[pocision];
    };
    ;
    Sucursal.prototype.modificarCliente = function () {
        var pocision = Number(readlineSync.question("Ingrese la pocision del cliente que desea modificar:"));
        this.listaDeClientes[pocision].nombre = readlineSync.question("Ingrese el nuevo nombre del cliente: ");
        this.listaDeClientes[pocision].telefono = Number(readlineSync.question("Ingrese el nuevo telefono del cliente: "));
        var respuesta = readlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
        if (respuesta.toLocaleLowerCase() === "si") {
            this.listaDeClientes[pocision].id = this.generarId();
        }
    };
    ;
    Sucursal.prototype.verClientes = function () {
        for (var i = 0; i < this.listaDeClientes.length; i++) {
            if (isNaN(this.listaDeClientes[i].id) === false) {
                console.log("ID: ".concat(this.listaDeClientes[i].id, "; Nombre: ").concat(this.listaDeClientes[i].nombre, ";  Telefono: ").concat(this.listaDeClientes[i].telefono, ";  Visitas: ").concat(this.listaDeClientes[i].numeroDeVisitas, ";    VIP: ").concat(this.listaDeClientes[i].esVip, ";"));
            }
            ;
        }
        ;
    };
    ;
    //En vez de introducir el id introducimos el indice del dueno asi automaticamente actualiza el numero de visitas y comprueba si es VIP
    Sucursal.prototype.altaPaciente = function () {
        var nombre = readlineSync.question("Ingrese el nombre del paciente: ");
        var especie;
        var respuesta = readlineSync.question("Ingrese la especie del paciente: ");
        if (respuesta.toLocaleLowerCase() === "perro") {
            especie = "perro";
        }
        else if (respuesta.toLocaleLowerCase() === "gato") {
            especie = "gato";
        }
        else {
            especie = "exotica (".concat(respuesta, ")");
        }
        ;
        var cliente = this.listaDeClientes[readlineSync.question("Ingrese la pocision del dueno: ")];
        var dueno = cliente.id;
        var nuevoPaciente = new Paciente_1["default"](nombre, especie, dueno);
        this.listaDePacientes.push(nuevoPaciente);
        cliente.numeroDeVisitas = cliente.numeroDeVisitas + 1;
        cliente.comprobarVip();
    };
    ;
    Sucursal.prototype.bajaPaciente = function () {
        var pocision = Number(readlineSync.question("Ingrese la pocision del paciente que desea eliminar:"));
        delete this.listaDePacientes[pocision];
    };
    ;
    Sucursal.prototype.modificarPaciente = function () {
        var pocision = Number(readlineSync.question("Ingrese la pocision del Paciente que desea modificar:"));
        this.listaDePacientes[pocision].nombre = readlineSync.question("Ingrese el nuevo nombre del paciente: ");
        var especie;
        var respuesta = readlineSync.question("Ingrese la especie del paciente: ");
        if (respuesta.toLocaleLowerCase() === "perro") {
            especie = "perro";
        }
        else if (respuesta.toLocaleLowerCase() === "gato") {
            especie = "gato";
        }
        else {
            especie = "exotica (".concat(respuesta, ")");
        }
        ;
        this.listaDePacientes[pocision].especie = especie;
    };
    ;
    Sucursal.prototype.verPacientes = function () {
        for (var i = 0; i < this.listaDePacientes.length; i++) {
            if (isNaN(this.listaDePacientes[i].dueno) === false) {
                console.log("Dueno: ".concat(this.listaDePacientes[i].dueno, ";  Nombre: ").concat(this.listaDePacientes[i].nombre, ";  Especie: ").concat(this.listaDePacientes[i].especie));
            }
            ;
        }
        ;
    };
    ;
    //Este metodo es una especie de menu para llamar otros metodos
    Sucursal.prototype.ejecutar = function () {
        while (this.entrada !== 0) {
            this.entrada = Number(readlineSync.question("<VETERINARIAS LISBOA> Ingrese un numero para... Clientes: 1 ver, 2 agregar, 3 editar, 4 borrar. Pacientes: 5 ver, 6 agregar, 7 editar, 8 borrar. 0 para salir."));
            switch (this.entrada) {
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
                    console.log("Entrada no valida.");
            }
            ;
        }
        ;
    };
    ;
    Sucursal.prototype.generarId = function () {
        //el primer 10000 es para asegurarse de que el id empieze en 1
        var id = 10000 + Math.floor(Math.random() * 10000);
        var idValidada = false;
        var idRepetida;
        while (idValidada === false) {
            idRepetida = false;
            for (var i = 0; i < this.listaDeClientes.length; i++) {
                if (id === this.listaDeClientes[i].id) {
                    idRepetida = true;
                }
                ;
            }
            ;
            if (idRepetida === false) {
                idValidada = true;
            }
            else {
                id = 10000 + Math.floor(Math.random() * 10000);
            }
            ;
        }
        ;
        return id;
    };
    ;
    Sucursal.prototype.cargarClientes = function () {
        var datos = new gestorDeArchivos_1["default"]("datosClientes.txt");
        for (var i = 0; i < datos.getArregloString().length; i++) {
            var atributosCliente = datos.getArregloString()[i].split(',');
            var nombre = atributosCliente[0];
            var telefono = Number(atributosCliente[1]);
            var id = this.generarId();
            var nuevoCliente = new Cliente_1["default"](nombre, telefono, id);
            this.listaDeClientes.push(nuevoCliente);
        }
        ;
    };
    ;
    Sucursal.prototype.cargarPacientes = function () {
        var datos = new gestorDeArchivos_1["default"]("datosPacientes.txt");
        for (var i = 0; i < datos.getArregloString().length; i++) {
            var atributosPaciente = datos.getArregloString()[i].split(',');
            var nombre = atributosPaciente[0];
            var especie = atributosPaciente[1];
            var IndiceDueno = Number(atributosPaciente[2]);
            var nuevoPaciente = new Paciente_1["default"](nombre, especie, IndiceDueno);
            this.listaDePacientes.push(nuevoPaciente);
            this.listaDeClientes[IndiceDueno].numeroDeVisitas = this.listaDeClientes[IndiceDueno].numeroDeVisitas + 1;
            this.listaDeClientes[IndiceDueno].comprobarVip();
        }
        ;
    };
    ;
    return Sucursal;
}());
exports["default"] = Sucursal;
;
var SucursalAyacucho = new Sucursal("Coimbra", "San Martin 1230", 214124);
SucursalAyacucho.cargarClientes();
SucursalAyacucho.cargarPacientes();
SucursalAyacucho.ejecutar();
