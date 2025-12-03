import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
/**
 * @class Cl_mTransaccion
 * Clase modelo para la entidad Transacción.
 * Extiende de Cl_mTablaWeb y gestiona los atributos financieros.
 */
export default class Cl_mTransaccion extends Cl_mTablaWeb {
    /**
     * @constructor
     * Inicializa una nueva instancia de Transaccion.
     * Hereda 'id', 'creadoEl' y 'alias' de Cl_mTablaWeb.
     * @param {ITransaccion} data - Objeto con los datos iniciales de la Transacción.
     */
    constructor({ id, creadoEl, alias, fecha, descripcion, referencia, categoria, monto, tipo, } = {
        id: null,
        creadoEl: null,
        alias: null,
        fecha: "",
        descripcion: "",
        referencia: "",
        categoria: "",
        monto: 0,
        tipo: "",
    }) {
        // Llama al constructor de la clase base (Cl_mTablaWeb)
        super({ id, creadoEl, alias });
        // Atributos privados
        this._fecha = "";
        this._descripcion = "";
        this._referencia = "";
        this._categoria = "";
        this._monto = 0;
        this._tipo = "";
        // Asigna los atributos específicos de la Transacción
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.referencia = referencia;
        this.categoria = categoria;
        this.monto = monto;
        this.tipo = tipo;
    }
    // --- Getters y Setters ---
    set fecha(fecha) {
        this._fecha = fecha;
    }
    get fecha() {
        return this._fecha;
    }
    set descripcion(descripcion) {
        // Uso de .trim() para limpieza y .toUpperCase()
        this._descripcion = descripcion.toUpperCase().trim();
    }
    get descripcion() {
        return this._descripcion;
    }
    set referencia(referencia) {
        // Uso de .trim() para limpieza y .toUpperCase()
        this._referencia = referencia.toUpperCase().trim();
    }
    get referencia() {
        return this._referencia;
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
        // Convertir a mayúsculas y limpiar para consistencia (ej: "INGRESO" o "EGRESO")
        this._tipo = tipo.toUpperCase().trim();
    }
    get tipo() {
        return this._tipo;
    }
    // --- Métodos de Validación al estilo Ok() ---
    /**
     * Valida que la fecha tenga un formato correcto (simplificado, solo verifica longitud).
     * Se recomienda usar una librería como Moment.js o Date-fns para validaciones reales.
     * @returns {boolean} True si la fecha es válida.
     */
    get fechaOk() {
        return this.fecha.length > 5; // Una validación básica
    }
    /**
     * Valida que la descripción no esté vacía y no sea demasiado larga.
     * @returns {boolean} True si la descripción es válida.
     */
    get descripcionOk() {
        return this.descripcion.length > 2 && this.descripcion.length <= 20;
    }
    /**
     * Valida que el monto sea positivo.
     * @returns {boolean} True si el monto es válido.
     */
    get montoOk() {
        return this.monto > 0;
    }
    /**
     * Valida que el tipo sea 'INGRESO' o 'EGRESO'.
     * @returns {boolean} True si el tipo es válido.
     */
    get tipoOk() {
        const tipoValido = ["INGRESO", "EGRESO"];
        return tipoValido.includes(this.tipo);
    }
    /**
     * Valida si la Transacción es válida en general, devolviendo el nombre del campo fallido.
     * @returns {string | true} El nombre del atributo fallido o true si todo está Ok.
     */
    get transaccionOk() {
        if (!this.fechaOk)
            return "fecha";
        if (!this.descripcionOk)
            return "descripcion";
        if (!this.montoOk)
            return "monto";
        if (!this.tipoOk)
            return "tipo";
        return true;
    }
    // --- Serialización ---
    /**
     * Convierte la instancia de la clase a un objeto JSON compatible con ITransaccion.
     * @returns {ITransaccion} Objeto con los datos de la Transacción.
     */
    toJSON() {
        // Une los datos de la clase base (super.toJSON()) con los de la Transacción.
        return Object.assign(Object.assign({}, super.toJSON()), { fecha: this._fecha, descripcion: this._descripcion, referencia: this._referencia, categoria: this._categoria, monto: this._monto, tipo: this._tipo });
    }
}
