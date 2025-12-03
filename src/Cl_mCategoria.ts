export interface iCategoria{
    nombre:string
}
export default class Cl_mCategoria{
    private _nombre:string = "";
    constructor({nombre}:{nombre:string}){
        this.nombre = nombre;
    }
    set nombre(nombre:string){
        this._nombre = nombre;

    }
    get nombre():string{
        return this._nombre
    }
    get nombreOK():boolean{
        return this._nombre.length > 0
    }
    get CategoriaOk():string | true{
        if(!this.nombreOK) return "Nombre"
        return true
    }
    toJSON(): iCategoria{
        return{
            nombre:this.nombre
        }
    }
}