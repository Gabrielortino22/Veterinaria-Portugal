import * as fs from 'fs';

export default class GestorDeArchivos {    
    private arregloString: string[];    
    constructor(txtFileLocation: string) {        
        let archivoTxt: string = fs.readFileSync(txtFileLocation, 'utf-8');
        this.arregloString = archivoTxt.split(';');
    }    public mostrarArreglo(): void {
        console.log(this.arregloString);
    }    public getArregloString(): string[] {
        return this.arregloString;
    }}