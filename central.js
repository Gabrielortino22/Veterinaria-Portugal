"use strict";
exports.__esModule = true;
var ReadlineSync = require("readline-sync");
var Sucursal_1 = require("./Sucursal");
var Proovedor_1 = require("./Proovedor");
var gestorDeArchivos_1 = require("./gestorDeArchivos");
var Central = /** @class */ (function () {
    function Central() {
        this.listaSucursales = new Array;
        this.listaProovedores = new Array;
    }
    ;
    Central.prototype.getlistaSucursales = function () {
        return this.listaSucursales;
    };
    ;
    Central.prototype.getListaProovedores = function () {
        return this.listaProovedores;
    };
    ;
    //FUNCIONES PARA SUCURSALES
    Central.prototype.cargarSucursales = function () {
        var datos = new gestorDeArchivos_1["default"]("datosSucursal.txt");
        for (var i = 0; i < datos.getArregloString().length; i++) {
            var atributosSucursales = datos.getArregloString()[i].split(',');
            var nombre = atributosSucursales[0];
            var direccion = atributosSucursales[1];
            var id = this.generarId();
            var nuevaSucursal = new Sucursal_1["default"](nombre, direccion, id);
            this.listaSucursales.push(nuevaSucursal);
        }
        ;
    };
    ;
    Central.prototype.bajaSucursal = function () {
        var id = Number(ReadlineSync.question("Ingrese el ID de la sucursal que desea borrar: "));
        var idValidada = false;
        for (var i = 0; i < this.listaSucursales.length; i++) {
            if (id === this.listaSucursales[i].id) {
                idValidada = true;
                this.listaSucursales.splice(i, 1);
                console.log("La sucursal ha sido eliminada del sistema.");
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
    Central.prototype.altaSucursal = function () {
        var nombre = ReadlineSync.question("Ingrese el nombre de la sucursal: ");
        var direccion = ReadlineSync.question("Ingrese la direccion de la sucursal:");
        var id = this.generarId();
        var nuevaSucursal = new Sucursal_1["default"](nombre, direccion, id);
        this.listaSucursales.push(nuevaSucursal);
    };
    ;
    Central.prototype.modificarSucursal = function () {
        var id = Number(ReadlineSync.question("Ingrese la id de la sucursal que desea modificar:"));
        var idValidada = false;
        for (var i = 0; i < this.listaSucursales.length; i++) {
            if (id === this.listaSucursales[i].id) {
                idValidada = true;
                this.listaSucursales[i].nombre = ReadlineSync.question("Ingrese el nuevo nombre de la sucursal: ");
                this.listaSucursales[i].direccion = (ReadlineSync.question("Ingrese la nueva direccion: "));
                var respuesta = ReadlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
                if (respuesta.toLocaleLowerCase() === "si") {
                    this.listaSucursales[i].id = this.generarId();
                }
                ;
                console.log("Sucursal modificada");
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
    Central.prototype.verSucursal = function () {
        for (var i = 0; i < this.listaSucursales.length; i++) {
            if (isNaN(this.listaSucursales[i].id) === false) {
                console.log("ID: ".concat(this.listaSucursales[i].id, ";   Nombre Sucursal: ").concat(this.listaSucursales[i].nombre, ";    Direccion: ").concat(this.listaSucursales[i].direccion));
            }
            ;
        }
        ;
    };
    ;
    Central.prototype.ejecutarSucursal = function () {
        var id = Number(ReadlineSync.question("Ingrese el ID de la sucursal que desea ejecutar: "));
        var idValidada = false;
        for (var i = 0; i < this.listaSucursales.length; i++) {
            if (id === this.listaSucursales[i].id) {
                idValidada = true;
                this.listaSucursales[i].ejecutar();
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
    //FUNCIONES PARA PROOVEDORES
    Central.prototype.cargarProovedores = function () {
        var datos = new gestorDeArchivos_1["default"]("datosProovedores.txt");
        for (var i = 0; i < datos.getArregloString().length; i++) {
            var atributosProovedores = datos.getArregloString()[i].split(',');
            var nombre = atributosProovedores[0];
            var telefono = Number(atributosProovedores[1]);
            var id = this.generarIdProovedor();
            var nuevoProovedor = new Proovedor_1["default"](nombre, telefono, id);
            this.listaProovedores.push(nuevoProovedor);
        }
        ;
    };
    ;
    Central.prototype.bajaProovedor = function () {
        var id = Number(ReadlineSync.question("Ingrese el ID del proovedor que desea borrar: "));
        var idValidada = false;
        for (var i = 0; i < this.listaProovedores.length; i++) {
            if (id === this.listaProovedores[i].id) {
                idValidada = true;
                this.listaProovedores.splice(i, 1);
                console.log("Proovedor eliminado del sistema.");
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
    Central.prototype.altaProovedor = function () {
        var nombre = ReadlineSync.question("Ingrese el nombre del proovedor: ");
        var telefono = ReadlineSync.question("Ingrese el telefono del proovedor:");
        var id = this.generarIdProovedor();
        var nuevoProovedor = new Proovedor_1["default"](nombre, telefono, id);
        this.listaProovedores.push(nuevoProovedor);
    };
    ;
    Central.prototype.verProovedores = function () {
        for (var i = 0; i < this.listaProovedores.length; i++) {
            if (isNaN(this.listaProovedores[i].id) === false) {
                console.log("ID: ".concat(this.listaProovedores[i].id, ";   Nombre Proovedor: ").concat(this.listaProovedores[i].nombre, ";  Telefono: ").concat(this.listaProovedores[i].telefono, ";"));
            }
            ;
        }
        ;
    };
    ;
    Central.prototype.modificarProovedor = function () {
        var id = Number(ReadlineSync.question("Ingrese el ID del proovedor que desea modificar: "));
        var idValidada = false;
        for (var i = 0; i < this.listaProovedores.length; i++) {
            if (id === this.listaProovedores[i].id) {
                idValidada = true;
                this.listaProovedores[i].nombre = ReadlineSync.question("Ingrese el nuevo nombre del provedor: ");
                this.listaProovedores[i].telefono = Number(ReadlineSync.question("Ingrese el nuevo telefono del proovedor: "));
                var respuesta = ReadlineSync.question("Si desea generar una nueva ID ingrese 'si': ");
                if (respuesta.toLocaleLowerCase() === "si") {
                    this.listaProovedores[i].id = this.generarIdProovedor();
                }
                ;
                console.log("Proovedor modificado.");
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
    Central.prototype.generarId = function () {
        //el primer 20000 es para asegurarse de que el id empieze en 2
        var id = 20000 + Math.floor(Math.random() * 20000);
        var idValidada = false;
        var idRepetida;
        while (idValidada === false) {
            idRepetida = false;
            for (var i = 0; i < this.listaSucursales.length; i++) {
                if (id === this.listaSucursales[i].id) {
                    idRepetida = true;
                }
                ;
            }
            ;
            if (idRepetida === false) {
                idValidada = true;
            }
            else {
                id = 20000 + Math.floor(Math.random() * 20000);
            }
            ;
        }
        ;
        return id;
    };
    ;
    Central.prototype.generarIdProovedor = function () {
        //el primer 30000 es para asegurarse de que el id empieze en 3
        var id = 30000 + Math.floor(Math.random() * 30000);
        var idValidada = false;
        var idRepetida;
        while (idValidada === false) {
            idRepetida = false;
            for (var i = 0; i < this.listaProovedores.length; i++) {
                if (id === this.listaProovedores[i].id) {
                    idRepetida = true;
                }
                ;
            }
            ;
            if (idRepetida === false) {
                idValidada = true;
            }
            else {
                id = 30000 + Math.floor(Math.random() * 30000);
            }
            ;
        }
        ;
        return id;
    };
    ;
    Central.prototype.ejecutar = function () {
        while (this.entrada !== 0) {
            this.entrada = Number(ReadlineSync.question("<veterinarias portugal> Ingrese un numero para... Sucursales: 1 ver, 2 agregar, 3 editar, 4 borrar, 5 ejecutar. Proovedores: 6 ver, 7 agregar, 8 editar, 9 borrar. 0 para salir."));
            switch (this.entrada) {
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
                    this.ejecutarSucursal();
                    break;
                case 6:
                    this.verProovedores();
                    break;
                case 7:
                    this.altaProovedor();
                    break;
                case 8:
                    this.modificarProovedor();
                    break;
                case 9:
                    this.bajaProovedor();
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
    return Central;
}());
;
var MiCentral = new Central();
MiCentral.cargarSucursales();
MiCentral.cargarProovedores();
MiCentral.listaSucursales[0].cargarClientes();
MiCentral.listaSucursales[0].cargarPacientes();
MiCentral.ejecutar();
