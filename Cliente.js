"use strict";
exports.__esModule = true;
var Cliente = /** @class */ (function () {
    function Cliente(nombre, telefono, id) {
        this.nombre = nombre;
        this.id = id;
        this.telefono = telefono;
        this.esVip = false;
        this.numeroDeVisitas = 0;
    }
    ;
    Cliente.prototype.setcomprobarVip = function () {
        return this.esVip;
    };
    ;
    Cliente.prototype.comprobarVip = function () {
        if (this.numeroDeVisitas >= 5) {
            this.esVip = true;
        }
        ;
    };
    ;
    return Cliente;
}());
exports["default"] = Cliente;
;
