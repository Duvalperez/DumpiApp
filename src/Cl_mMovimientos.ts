export interface IMovimientos {
    referencia: string;
    descripcion: string;
    categoria: string;
    monto: number;
    tipo: string;
    fecha: string;
}

export default class Cl_mMovimientos {
    private _referencia: string = "";
    private _descripcion: string = "";
    private _categoria: string = "";
    private _monto: number = 0;
    private _tipo: string = "";
    private _fecha: string = "";

    constructor({ referencia, descripcion, categoria, monto, tipo, fecha }:
        {
            referencia: string,
            descripcion: string,
            categoria: string,
            monto: number,
            tipo: string,
            fecha: string
        }) {
        this.referencia = referencia;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.monto = monto;
        this.tipo = tipo;
        this.fecha = fecha;


    }
    set referencia(referencia: string) {
        this._referencia = referencia.toUpperCase().trim()
    }
    get referencia(): string {
        return this._referencia
    }
    set descripcion(descripcion: string) {
        this._descripcion = descripcion.toUpperCase().trim();
    }
    get descripcion(): string {
        return this._descripcion;
    }

    set categoria(categoria: string) {
        this._categoria = categoria;
    }
    get categoria(): string {
        return this._categoria;
    }

    set monto(monto: number) {
        this._monto = +monto;
    }
    get monto(): number {
        return this._monto;
    }

    set tipo(tipo: string) {
        this._tipo = tipo;
    }
    get tipo(): string {
        return this._tipo;
    }

    set fecha(fecha: string) {
        this._fecha = fecha;
    }
    get fecha(): string {
        return this._fecha;
    }
    get referenciaOk(): boolean {
        return this._referencia.length > 0 && this._referencia.length < 30
    }
    get descripcionOk(): boolean {
        return this.descripcion.length > 0 && this.descripcion.length < 30
    }
    get montoOk(): boolean {
        return this.monto > 0
    }
    get movimientoOk(): string | true| false {
        if (!this.referenciaOk) return "Referencia"
        if (!this.descripcionOk) return "Descripcion"
        if (!this.montoOk) return "Monto"
        return true
    }
    toJSON(): IMovimientos {
        return {
            referencia: this._referencia,
            descripcion: this._descripcion,
            categoria: this._categoria,
            monto: this._monto,
            tipo: this._tipo,
            fecha: this._fecha
        }
    }
}