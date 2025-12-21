export default class Cl_mMovimientos {
    constructor({ referencia, descripcion, categoria, monto, tipo, fecha, }) {
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
        this._referencia = referencia.trim().toUpperCase();
    }
    get referencia() {
        return this._referencia;
    }
    set descripcion(descripcion) {
        this._descripcion = descripcion.trim().toUpperCase();
    }
    get descripcion() {
        return this._descripcion;
    }
    set categoria(categoria) {
        this._categoria = categoria.trim().toUpperCase();
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
        this._tipo = tipo.trim().toUpperCase();
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
    error() {
        if (this._referencia.length === 0)
            return "Elemento de Referencia vacío";
        if (this._referencia.length < 3)
            return "Referencia debe tener al menos 3 caracteres";
        if (this._descripcion.length === 0)
            return "Descripción del Movimiento vacía";
        if (this._categoria.length === 0)
            return "Categoría del Movimiento vacía";
        if (isNaN(this._monto))
            return "El Monto debe ser un valor numérico";
        if (this._monto <= 0)
            return "El Monto debe ser mayor a cero";
        const TIPOS_VALIDOS = ["CARGO", "ABONO"];
        if (!TIPOS_VALIDOS.includes(this._tipo))
            return `El Tipo "${this._tipo}" no es válido. Debe ser uno de: ${TIPOS_VALIDOS.join(', ')}`;
        if (this._fecha.length === 0)
            return "Fecha del Movimiento vacía";
        return false;
    }
    toJSON() {
        return {
            referencia: this.referencia,
            descripcion: this.descripcion,
            categoria: this.categoria,
            monto: this.monto,
            tipo: this.tipo,
            fecha: this.fecha,
        };
    }
}
