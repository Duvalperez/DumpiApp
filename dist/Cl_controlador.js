import Cl_mCategoria from "./Cl_mCategoria.js"; // Clase e interfaz de Categoría (reemplaza Materia)
export default class Cl_controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    // -----------------------------------------------------------------
    // ## Lógica de Categorías (Reemplaza Materias)
    // -----------------------------------------------------------------
    /**
     * Agrega una nueva categoría al modelo.
     * @param dtCategoria Datos de la Categoría.
     * @param callback Función de retorno con el error.
     */
    addCategoria({ dtCategoria, callback, }) {
        this.modelo.addCategoria({
            dtCategoria,
            callback,
        });
    }
    // Nota: Dejaré los métodos 'editCategoria' y 'deleteCategoria'
    // comentados, ya que no los implementamos en Cl_mFinanzas,
    // pero su estructura sería análoga a la de 'editMateria' y 'deleteMateria'.
    // editCategoria({
    //   dtCategoria,
    //   callback,
    // }: {
    //   dtCategoria: iCategoria;
    //   callback: (error: string | boolean) => void;
    // }): void {
    //   this.modelo.editCategoria({
    //     dtCategoria,
    //     callback,
    //   });
    // }
    /**
     * Elimina una categoría del modelo por su ID.
     * @param id El ID de la categoría a eliminar.
     * @param callback Función de retorno con el error.
     */
    deleteCategoria({ id, callback, }) {
        this.modelo.deleteCategoria({
            id,
            callback,
        });
    }
    /**
     * Busca y devuelve una instancia (copia) de Cl_mCategoria por su ID.
     * @param id ID de la categoría.
     * @returns Instancia de Cl_mCategoria o null.
     */
    categoria(id) {
        let categoria = this.modelo.categoria(id);
        // Devolvemos una nueva instancia para evitar modificar el objeto del modelo directamente
        if (categoria)
            return new Cl_mCategoria(categoria.toJSON());
        else
            return null;
    }
    /**
     * Obtiene la lista ordenada de categorías como objetos iCategoria.
     */
    get dtCategorias() {
        let dtCategorias = this.modelo.dtCategorias();
        // Ordenar por nombre alfabéticamente
        dtCategorias.sort((a, b) => a.nombre.localeCompare(b.nombre));
        return dtCategorias;
    }
    // -----------------------------------------------------------------
    // ## Lógica de Transacciones (Reemplaza Estudiantes)
    // -----------------------------------------------------------------
    /**
     * Agrega una nueva transacción al modelo.
     * @param dtTransaccion Datos de la Transacción.
     * @param callback Función de retorno con el error.
     */
    addTransaccion({ dtTransaccion, callback, }) {
        this.modelo.addTransaccion({
            dtTransaccion,
            callback,
        });
    }
    /**
     * Obtiene la lista ordenada de transacciones como objetos ITransaccion.
     */
    get dtTransacciones() {
        let dtTransacciones = this.modelo.dtTransacciones();
        // Ordenar por fecha o monto (ejemplo: por fecha descendente)
        dtTransacciones.sort((a, b) => b.fecha.localeCompare(a.fecha));
        return dtTransacciones;
    }
    // -----------------------------------------------------------------
    // ## Lógica de Vista (Reemplaza activarVista genérica)
    // -----------------------------------------------------------------
    /**
     * Activa una vista específica, pasando datos y opciones.
     * @param vista El nombre de la vista (ej: 'transacciones', 'newCategoria').
     * @param opcion Si es 'add' o 'edit'.
     * @param objeto La instancia del modelo (Categoría o Transacción) para editar.
     */
    activarVista({ vista, opcion, objeto, }) {
        // La vista principal (Cl_vFinanzas) se encargará de delegar la llamada al método 'show'
        // de la vista específica (ej: Cl_vCategorias o Cl_vTransacciones).
        this.vista.activarVista({ vista, opcion, objeto });
    }
}
