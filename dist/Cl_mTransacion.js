import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
export default class Cl_mTransaccion extends Cl_mTablaWeb {
    constructor({ id, creadoEl, alias, fecha, descripcion, referencia, categoria, monto, tipo }) {
        super({ id, creadoEl, alias });
        this._fecha = "";
        this._descripcion = "";
        this._referencia = "";
        this._categoria = "";
        this._monto = 0;
        this._tipo = "";
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.referencia = referencia;
        this.categoria = categoria;
        this.monto = monto;
        this.tipo = tipo;
    }
    set fecha(fecha) {
        this._fecha = fecha;
    }
    get fecha() {
        return this.fecha;
    }
    set descripcion(descripcion) {
        this.descripcion = descripcion.toUpperCase().trim();
    }
    get descripcion() {
        return this.descripcion;
    }
    set referencia(referencia) {
        this._referencia = referencia.toUpperCase().trim();
    }
    get referencia() {
        return this.referencia;
    }
    set categoria(categoria) {
        this.categoria = categoria;
    }
    get categoria() {
        return this.categoria;
    }
    set monto(monto) {
        this._monto = +monto;
    }
    get monto() {
        return this._monto;
    }
    set tipo(tipo) {
        this._tipo = tipo.toUpperCase().trim();
    }
    get tipo() {
        return this.tipo;
    }
    get fechaOk() {
        return this.fecha;
    }
    get descripcionOk() {
        return this.descripcion.length <= 20;
    }
    get referenciaOk() {
        return this.referencia.length > 0;
    }
    get montoOk() {
        return this.monto > 0;
    }
    get tipoOk() {
        return this.tipo.length > 0;
    }
    get transaccionOk() {
        if (!this.descripcionOk)
            return "Descripción no válida";
        if (!this.referenciaOk)
            return "Referencia no válida";
        if (!this.montoOk)
            return "Monto no válido";
        if (!this.tipoOk)
            return "Tipo no válido";
        return true;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { fecha: this._fecha, descripcion: this._descripcion, referencia: this._referencia, categoria: this._categoria, monto: this._monto, tipo: this._tipo });
    }
}
