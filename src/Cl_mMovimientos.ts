export interface iMovimientos {
    referencia: string;
    descripcion: string;
    categoria: string;
    monto: number;
    tipo: string;
    fecha: string;
    estatus?: string;
 
    
}
export default class Cl_mMovimientos {
    private _referencia: string = "";
    private _descripcion: string = "";
    private _categoria: string = "";
    private _monto: number = 0;
    private _tipo: string = "";
    private _fecha: string = "";
    constructor({
        referencia,
        descripcion,
        categoria,
        monto,
        tipo,
        fecha,
    }: {
        referencia: string,
        descripcion: string,
        categoria: string,
        monto: number,
        tipo: string,
        fecha: string,
    }) {
        this.referencia = referencia;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.monto = monto;
        this.tipo = tipo;
        this.fecha = fecha;
    }
    set referencia(referencia: string) {
        this._referencia = referencia.trim().toUpperCase();
    }
    get referencia(): string {
        return this._referencia
    }
    set descripcion(descripcion: string) {
        this._descripcion = descripcion.trim().toUpperCase();
    }
    get descripcion(): string {
        return this._descripcion
    }
    set categoria(categoria: string) {
        this._categoria = categoria.trim().toUpperCase();
    }
    get categoria(): string {
        return this._categoria
    }
    set monto(monto: number) {
        this._monto = +monto
    }
    get monto(): number {
        return this._monto
    }
    set tipo(tipo: string) {
        this._tipo = tipo.trim().toUpperCase();
    }
    get tipo(): string {
        return this._tipo
    }
    set fecha(fecha: string) {
        this._fecha = fecha
    }
    get fecha(): string {
        return this._fecha
    }
    error(): string | false {
     
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
        
       
        const TIPOS_VALIDOS = ["CARGO","ABONO"];
        if (!TIPOS_VALIDOS.includes(this._tipo))
            return `El Tipo "${this._tipo}" no es válido. Debe ser uno de: ${TIPOS_VALIDOS.join(', ')}`;

       
        if (this._fecha.length === 0) 
            return "Fecha del Movimiento vacía";
        
       
      
       

        return false; 
    }
    toJSON():iMovimientos{
        return{
            referencia:this.referencia,
            descripcion:this.descripcion,
            categoria:this.categoria,
            monto:this.monto,
            tipo:this.tipo,
            fecha:this.fecha,
          
        }
    }

}