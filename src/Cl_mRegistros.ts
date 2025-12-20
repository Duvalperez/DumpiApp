import Cl_mCategoria, { iCategoria } from "./Cl_mCategoria.js";
import Cl_mMovimientos, { iMovimientos } from "./Cl_mMovimientos.js";

export default class Cl_mRegistros {
  private movimientos: Cl_mMovimientos[] = [];
  private categorias: Cl_mCategoria[] = [];


  agregarMovimientos({
    datMovimientos,
    callback,
  }: {
    datMovimientos: Cl_mMovimientos;
    callback: (error: string | false) => void
  }): void {
    let error = datMovimientos.error();
    if (error) {
      callback(error)
      return;
    }
    let existe = this.movimientos.find((c) => c.referencia === datMovimientos.referencia)
    if (existe) {
      callback("La referencia ya registrada")
      return

    }
    this.movimientos.push(datMovimientos)
    
   
    localStorage.setItem("listMovimientos", JSON.stringify(this.listarMovimientos()));
    callback(false);
  }
  agregarCategoria({
    nombre,
    callback,
  }: {
    nombre: Cl_mCategoria;
    callback: (error: string | false) => void;
  }): void {
    // Validar que el nombre no tenga errores
    let error = nombre.error();
    if (error) {
      callback(error);
      return;
    }
    // Validar que no se repita el teléfono
    let existe = this.categorias.find((c) => c.nombre === nombre.nombre);
    if (existe) {
      callback("El número de teléfono ya está registrado.");
      return;
    }
    this.categorias.push(nombre);
    localStorage.setItem("listCategoria", JSON.stringify(this.listar()));
    callback(false);
  }
  deleteMovimientos({
    referencia,
    callback,
  }: {
    referencia: string;
    callback: (error: string | boolean) => void;
  }): void {
    let indice = this.movimientos.findIndex((m) => m.referencia === referencia);
    this.movimientos.splice(indice, 1)
    localStorage.setItem("listaMovimientos", JSON.stringify(this.listarMovimientos()));
    callback("Eliminada")
  }
  deleteCategoria({
    nombre,
    callback
  }: {
    nombre: string,
    callback: (error: string | boolean) => void;
  }): void {
    let indice = this.categorias.findIndex((m) => m.nombre === nombre);
    this.categorias.splice(indice, 1)
    localStorage.setItem("listCategoria", JSON.stringify(this.listar()));
    callback("Eliminada")
  }
  cantMovimientos(){
    return this.movimientos.length
  }
  //Busqueda por referencia
  BuscarReferencia({
    referencia,
    callback,
  }:{
    referencia:string,
    callback:(error:string | false) =>void
  }){
     
    console.log( this.movimientos.find((e)=> e.referencia ===referencia))
    
  }
  listarMovimientos(): iMovimientos[] {
      console.log(this.movimientos)
    let lista: iMovimientos[] = [];
    this.movimientos.forEach((movimientos) => {
      lista.push(movimientos.toJSON())
    });
    return lista
  }

  listar(): iCategoria[] {
    let lista: iCategoria[] = [];
    this.categorias.forEach((nombre) => {
      lista.push(nombre.toJSON());
    });
    return lista;
  }

  //seccion de Funciones procesadas para las otras vistas
  //cantidad de Operaciones registradas
  OperRegistradas(){
    return this.movimientos.length
  }
  procesarMovimientos(){
  
  }

}