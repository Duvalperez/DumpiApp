import Cl_mTablaWeb from "./tools/Cl_mTablaWeb";
export default class cl_mRegistro extends Cl_mTablaWeb {
    constructor({ id, creadoEl, alias, fecha, referencia, descripcion, categoria, monto, tipo }) {
        super({ id, creadoEl, alias });
        this._fecha = "";
        this._referencia = "";
        this._descripcion = "";
        this._categoria = "";
        this._monto = 0;
        this._tipo = "";
        this.fecha = fecha;
        this.referencia = referencia;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.monto = monto;
        this.tipo = tipo;
    }
    set fecha(fecha) {
        this._fecha = fecha;
    }
    get fecha() {
        return this._fecha;
    }
    set referencia(referencia) {
        this._referencia = referencia;
    }
    get referencia() {
        return this._referencia;
    }
    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }
    get descripcion() {
        return this._descripcion;
    }
    set categoria(categoria) {
        this._categoria = categoria;
    }
    get categoria() {
        return this._categoria;
    }
    set monto(monto) {
        this._monto = monto;
    }
    get monto() {
        return this._monto;
    }
    set tipo(tipo) {
        this._tipo = tipo;
    }
    get tipo() {
        return this._tipo;
    }
    get tipoOk() {
        return this._tipo === "CARGO" || this._tipo == "ABONO";
    }
    get descripcionOk() {
        return this._descripcion.length > 0 && this._descripcion.length < 20;
    }
    get categoriaOk() {
        return this._categoria.length > 0;
    }
    get montoOk() {
        return this._monto > 0;
    }
    get registroOk() {
        if (!this.tipoOk)
            return "Tipo";
        if (!this.descripcionOk)
            return "Descripcion";
        if (!this.categoria)
            return "Categoria";
        if (!this.montoOk)
            return "Monto";
        return true;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { fecha: this.fecha, referencia: this.referencia, descripcion: this.descripcion, categoria: this.categoria, monto: this.monto, tipo: this.tipo });
    }
}
