import Cl_mTablaWeb from "./tools/Cl_mTablaWeb";
export default class Cl_mCategoria extends Cl_mTablaWeb {
    constructor({ id, creadoEl, alias, nombre } = {
        id: null,
        creadoEl: null,
        alias: null,
        nombre: ""
    }) {
        super({ id, creadoEl, alias });
        this._nombre = "";
        this._nombre = nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    get nombre() {
        return this._nombre;
    }
    get nombreOk() {
        return this._nombre.length > 0;
    }
    get categoriaOk() {
        if (!this.nombre)
            return "Nombre";
        return true;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { nombre: this.nombre });
    }
}
