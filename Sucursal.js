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
        var id = Number(readlineSync.question("Ingrese el ID del cliente que desea borrar: "));
        var idValidada = false;
        for (var i = 0; i < this.listaDeClientes.length; i++) {
            if (id === this.listaDeClientes[i].id) {
                idValidada = true;
                this.listaDeClientes.splice(i, 1);
                console.log("Cliente eliminado del sistema.");
                break;
            }
            ;
        }
        ;
        if (idValidada === false) {
            console.log("El ID introducido no existe.");
        }
        ;
    };
    ;
    Sucursal.prototype.modificarCliente = function () {
        var id = Number(readlineSync.question("Ingrese el ID del cliente que desea modificar: "));
        var idValidada = false;
        for (var i = 0; i < this.listaDeClientes.length; i++) {
            if (id === this.listaDeClientes[i].id) {
                idValidada = true;
                this.listaDeClientes[i].nombre = readlineSync.question("Ingrese el nuevo nombre del cliente: ");
                this.listaDeClientes[i].telefono = Number(readlineSync.question("Ingrese el nuevo telefono del cliente: "));
                var respuesta = readlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
                if (respuesta.toLocaleLowerCase() === "si") {
                    this.listaDeClientes[i].id = this.generarId();
                }
                ;
                console.log("Cliente modificado.");
                break;
            }
            ;
        }
        ;
        if (idValidada === false) {
            console.log("El ID introducido no existe.");
        }
        ;
    };
    ;
    Sucursal.prototype.verClientes = function () {
        for (var i = 0; i < this.listaDeClientes.length; i++) {
            if (isNaN(this.listaDeClientes[i].id) === false) {
                console.log("ID: ".concat(this.listaDeClientes[i].id, ";   Nombre: ").concat(this.listaDeClientes[i].nombre, ";  Telefono: ").concat(this.listaDeClientes[i].telefono, ";  Visitas: ").concat(this.listaDeClientes[i].numeroDeVisitas, ";    VIP: ").concat(this.listaDeClientes[i].esVip, ";"));
            }
            ;
        }
        ;
    };
    ;
    Sucursal.prototype.altaPaciente = function () {
        var id = this.generarIdPaciente();
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
            especie = "exotica(".concat(respuesta, ")");
        }
        ;
        var dueno = Number(readlineSync.question("Ingrese el ID del dueno: "));
        var duenoValidado = false;
        while (duenoValidado === false) {
            for (var i = 0; i < this.listaDeClientes.length; i++) {
                if (dueno === this.listaDeClientes[i].id) {
                    this.listaDeClientes[i].numeroDeVisitas = this.listaDeClientes[i].numeroDeVisitas + 1;
                    this.listaDeClientes[i].comprobarVip();
                    duenoValidado = true;
                }
                ;
            }
            ;
            if (duenoValidado === false) {
                dueno = Number(readlineSync.question("ID invalida, ingrese la ID nuevamente: "));
            }
            ;
        }
        ;
        var nuevoPaciente = new Paciente_1["default"](nombre, especie, dueno, id);
        this.listaDePacientes.push(nuevoPaciente);
    };
    ;
    Sucursal.prototype.bajaPaciente = function () {
        var id = Number(readlineSync.question("Ingrese la ID del paciente que desea eliminar:"));
        var idValidada = false;
        for (var i = 0; i < this.listaDePacientes.length; i++) {
            if (id === this.listaDePacientes[i].id) {
                idValidada = true;
                this.listaDePacientes.splice(i, 1);
                console.log("Paciente eliminado del sistema.");
                break;
            }
            ;
        }
        ;
        if (idValidada === false) {
            console.log("El ID introducido no existe.");
        }
        ;
    };
    ;
    Sucursal.prototype.modificarPaciente = function () {
        var id = Number(readlineSync.question("Ingrese el ID del paciente que desea modificar: "));
        var idValidada = false;
        for (var i = 0; i < this.listaDePacientes.length; i++) {
            if (id === this.listaDePacientes[i].id) {
                idValidada = true;
                this.listaDePacientes[i].nombre = readlineSync.question("Ingrese el nuevo nombre del paciente: ");
                var especie = void 0;
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
                this.listaDePacientes[i].especie = especie;
                var respuestaId = readlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
                if (respuestaId.toLocaleLowerCase() === "si") {
                    this.listaDePacientes[i].id = this.generarIdPaciente();
                }
                ;
                console.log("Paciente modificado.");
                break;
            }
            ;
        }
        ;
        if (idValidada === false) {
            console.log("El ID introducido no existe.");
        }
        ;
    };
    ;
    Sucursal.prototype.verPacientes = function () {
        for (var i = 0; i < this.listaDePacientes.length; i++) {
            if (isNaN(this.listaDePacientes[i].dueno) === false) {
                console.log("ID: ".concat(this.listaDePacientes[i].id, ";   Dueno: ").concat(this.listaDePacientes[i].dueno, ";  Nombre: ").concat(this.listaDePacientes[i].nombre, ";  Especie: ").concat(this.listaDePacientes[i].especie));
            }
            ;
        }
        ;
    };
    ;
    //Este metodo es una especie de menu para llamar otros metodos
    Sucursal.prototype.ejecutar = function () {
        while (this.entrada !== 0) {
            this.entrada = Number(readlineSync.question("<veterinaria ".concat(this.nombre, "> Ingrese un numero para... Clientes: 1 ver, 2 agregar, 3 editar, 4 borrar. Pacientes: 5 ver, 6 agregar, 7 editar, 8 borrar. 0 para salir.")));
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
    Sucursal.prototype.generarIdPaciente = function () {
        //el primer 40000 es para asegurarse de que el id empieze en 1
        var id = 40000 + Math.floor(Math.random() * 10000);
        var idValidada = false;
        var idRepetida;
        while (idValidada === false) {
            idRepetida = false;
            for (var i = 0; i < this.listaDePacientes.length; i++) {
                if (id === this.listaDePacientes[i].id) {
                    idRepetida = true;
                }
                ;
            }
            ;
            if (idRepetida === false) {
                idValidada = true;
            }
            else {
                id = 40000 + Math.floor(Math.random() * 10000);
            }
            ;
        }
        ;
        return id;
    };
    ;
    //Los siguientes dos metodos son para cargar los clientes y pacientes iniciales
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
            var id = this.generarIdPaciente();
            //el indice es un numero aleatorio dentro del rango del array de clientes para que los pacientes se distribuyan
            var indice = Math.floor(Math.random() * this.listaDeClientes.length);
            var idDueno = this.listaDeClientes[indice].id;
            var nuevoPaciente = new Paciente_1["default"](nombre, especie, idDueno, id);
            this.listaDePacientes.push(nuevoPaciente);
            this.listaDeClientes[indice].numeroDeVisitas = this.listaDeClientes[indice].numeroDeVisitas + 1;
            this.listaDeClientes[indice].comprobarVip();
        }
        ;
    };
    ;
    return Sucursal;
}());
exports["default"] = Sucursal;
;
