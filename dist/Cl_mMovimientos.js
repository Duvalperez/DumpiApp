export default class Cl_mMovimientos {
    constructor({ referencia, descripcion, categoria, monto, tipo, fecha }) {
        this._referencia = "";
        this._descripcion = "";
        this._categoria = "";
        this._monto = 0;
        this._tipo = "";
        this._fecha = "";
        this.referencia = referencia;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.monto = monto;
        this.tipo = tipo;
        this.fecha = fecha;
    }
    set referencia(referencia) {
        this._referencia = referencia.toUpperCase().trim();
    }
    get referencia() {
        return this._referencia;
    }
    set descripcion(descripcion) {
        this._descripcion = descripcion.toUpperCase().trim();
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
        this._monto = +monto;
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
    set fecha(fecha) {
        this._fecha = fecha;
    }
    get fecha() {
        return this._fecha;
    }
    get referenciaOk() {
        return this._referencia.length > 0 && this._referencia.length < 30;
    }
    get descripcionOk() {
        return this.descripcion.length > 0 && this.descripcion.length < 30;
    }
    get montoOk() {
        return this.monto > 0;
    }
    get movimientoOk() {
        if (!this.referenciaOk)
            return "Referencia";
        if (!this.descripcionOk)
            return "Descripcion";
        if (!this.montoOk)
            return "Monto";
        return true;
    }
    toJSON() {
        return {
            referencia: this._referencia,
            descripcion: this._descripcion,
            categoria: this._categoria,
            monto: this._monto,
            tipo: this._tipo,
            fecha: this._fecha
        };
    }
}
