export default class Cl_mCategoria {
    constructor({ nombre }) {
        this._nombre = "";
        this.nombre = nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    get nombre() {
        return this._nombre;
    }
    get nombreOK() {
        return this._nombre.length > 0;
    }
    get CategoriaOk() {
        if (!this.nombreOK)
            return "Nombre";
        return true;
    }
    toJSON() {
        return {
            nombre: this.nombre
        };
    }
}
