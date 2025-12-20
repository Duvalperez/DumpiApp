export interface iCategoria {
    nombre: string
}
export default class Cl_mCategoria {
    private _nombre: string = "";
    constructor({ nombre }: { nombre: string }) {
        this.nombre = nombre
    }
    set nombre(nombre: string) {
        this._nombre = nombre.trim().toUpperCase()
    }
    get nombre(): string {
        return this._nombre
    }
    error(): string | false {
        // Validar nombre
        if (this._nombre.length === 0) return "Categoria no Valida";
       
        return false;
    }
    toJSON(): iCategoria {
        return {
            nombre: this._nombre,

        };
    }

}