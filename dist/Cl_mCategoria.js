export default class Cl_mCategoria {
    constructor({ nombre }) {
        this._nombre = "";
        this.nombre = nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre.trim().toUpperCase();
    }
    get nombre() {
        return this._nombre;
    }
    error() {
        // Validar nombre
        if (this._nombre.length === 0)
            return "Categoria no Valida";
        return false;
    }
    toJSON() {
        return {
            nombre: this._nombre,
        };
    }
}
