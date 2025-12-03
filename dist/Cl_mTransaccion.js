import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251129-1230";
import Cl_mTransaccion from "./Cl_mRegistros.js";
import Cl_mCategoria from "./Cl_mCategoria.js";
/**
 * @class Cl_mFinanzas
 * Clase contenedora que administra la colección de Transacciones y Categorías
 * y gestiona su persistencia a través de la base de datos Cl_dcytDb.
 */
export default class Cl_mFinanzas {
    constructor() {
        // Nombres de las tablas en la base de datos
        this.tbCategoria = "finanzas.categoria";
        this.tbTransaccion = "finanzas.transaccion";
        this.db = new Cl_dcytDb({ aliasCuenta: "FINANZAS" });
        this.categorias = [];
        this.transacciones = [];
    }
    // -----------------------------------------------------------------
    // ## Métodos para CATEGORÍAS
    // -----------------------------------------------------------------
    /**
     * Agrega una nueva categoría a la colección y la guarda en la base de datos.
     * @param dtCategoria Datos de la Categoría.
     * @param callback Función a ejecutar al finalizar, recibe (error: string | false).
     */
    addCategoria({ dtCategoria, callback, }) {
        let categoria = new Cl_mCategoria(dtCategoria);
        // 1. Validar si ya existe una categoría con el mismo nombre
        if (this.categorias.find((c) => c.nombre.toUpperCase() === dtCategoria.nombre.toUpperCase())) {
            callback(`La categoría "${dtCategoria.nombre}" ya existe.`);
        }
        // 2. Validar que los datos de la categoría sean correctos
        else if (categoria.categoriaOk !== true) {
            callback(`Error de validación en el campo: ${categoria.categoriaOk}`);
        }
        // 3. Guardar la categoría
        else {
            this.db.addRecord({
                tabla: this.tbCategoria,
                object: categoria,
                callback: ({ objects: categorias, error }) => {
                    if (!error)
                        this.llenarCategorias(categorias !== null && categorias !== void 0 ? categorias : []);
                    callback === null || callback === void 0 ? void 0 : callback(error);
                },
            });
        }
    }
    deleteCategoria({ id, callback, }) {
        let categoriaInstancia = this.categorias.find((c) => c.id === id);
        // 1. Verificar si la categoría existe en la colección local
        if (!categoriaInstancia) {
            callback(`La categoría con ID ${id} no existe.`);
            return;
        }
        // 2. Verificar si alguna Transacción está usando esta Categoría
        let algunaTransaccionUsaCategoria = this.transacciones.some((t) => t.categoria.toUpperCase() === categoriaInstancia.nombre.toUpperCase());
        if (algunaTransaccionUsaCategoria) {
            callback(`No se puede eliminar la categoría "${categoriaInstancia.nombre}" porque tiene transacciones asociadas.`);
            return;
        }
        // 3. Eliminar la categoría de la base de datos
        this.db.deleteRecord({
            tabla: this.tbCategoria,
            // Usamos la instancia de la categoría encontrada para la eliminación
            object: categoriaInstancia,
            callback: ({ objects: categorias, error }) => {
                if (!error) {
                    // Si no hay error, actualizar la colección local
                    this.llenarCategorias(categorias !== null && categorias !== void 0 ? categorias : []);
                }
                callback === null || callback === void 0 ? void 0 : callback(error);
            },
        });
    }
    /**
     * Devuelve una instancia del modelo Cl_mCategoria por su ID.
     * ESTE MÉTODO FALTABA Y CAUSABA EL ERROR EN EL CONTROLADOR.
     * @param id El ID de la categoría.
     * @returns Cl_mCategoria o null.
     */
    categoria(id) {
        let categoria = this.categorias.find((c) => c.id === id);
        return categoria ? categoria : null;
    }
    /**
     * Devuelve un arreglo de objetos JSON de Categorías.
     * @returns {iCategoria[]} Lista de categorías.
     */
    dtCategorias() {
        return this.categorias.map((c) => c.toJSON());
    }
    // -----------------------------------------------------------------
    // ## Métodos para TRANSACCIONES
    // -----------------------------------------------------------------
    /**
     * Agrega una nueva transacción a la colección y la guarda en la base de datos.
     * @param dtTransaccion Datos de la Transacción.
     * @param callback Función a ejecutar al finalizar, recibe (error: string | false).
     */
    addTransaccion({ dtTransaccion, callback, }) {
        let transaccion = new Cl_mTransaccion(dtTransaccion);
        // 1. Validar que la transacción sea correcta
        if (transaccion.transaccionOk !== true) {
            callback(`Error de validación en el campo: ${transaccion.transaccionOk}`);
        }
        // 2. Validar que la Categoría exista (ejemplo de lógica de negocio)
        else if (!this.categorias.find((c) => c.nombre === dtTransaccion.categoria)) {
            callback(`La Categoría "${dtTransaccion.categoria}" no existe.`);
        }
        // 3. Guardar la transacción
        else {
            this.db.addRecord({
                tabla: this.tbTransaccion,
                object: transaccion,
                callback: ({ objects: transacciones, error }) => {
                    if (!error)
                        this.llenarTransacciones(transacciones !== null && transacciones !== void 0 ? transacciones : []);
                    callback === null || callback === void 0 ? void 0 : callback(error);
                },
            });
        }
    }
    /**
     * Devuelve un arreglo de objetos JSON de Transacciones.
     * @returns {ITransaccion[]} Lista de transacciones.
     */
    dtTransacciones() {
        return this.transacciones.map((t) => t.toJSON());
    }
    // -----------------------------------------------------------------
    // ## Métodos de Carga y Llenado
    // -----------------------------------------------------------------
    /**
     * Carga todas las Categorías y Transacciones desde la Web Storage.
     * @param callback Función a ejecutar al finalizar la carga.
     */
    cargar(callback) {
        // 1. Cargar Categorías
        this.db.listRecords({
            tabla: this.tbCategoria,
            callback: ({ objects, error }) => {
                if (error)
                    callback(`Error cargando categorías: ${error}`);
                else {
                    this.llenarCategorias(objects !== null && objects !== void 0 ? objects : []);
                    // 2. Si las categorías cargaron, cargar Transacciones
                    this.db.listRecords({
                        tabla: this.tbTransaccion,
                        callback: ({ objects: transacciones, error }) => {
                            if (error)
                                callback(`Error cargando transacciones: ${error}`);
                            else {
                                this.llenarTransacciones(transacciones !== null && transacciones !== void 0 ? transacciones : []);
                                callback(false); // Carga exitosa
                            }
                        },
                    });
                }
            },
        });
    }
    /**
     * Transforma los datos de Categoría cargados en instancias de Cl_mCategoria.
     * @param categorias Arreglo de datos iCategoria.
     */
    llenarCategorias(categorias) {
        this.categorias = [];
        categorias.forEach((categoria) => this.categorias.push(new Cl_mCategoria(categoria)));
    }
    /**
     * Transforma los datos de Transacción cargados en instancias de Cl_mTransaccion.
     * @param transacciones Arreglo de datos ITransaccion.
     */
    llenarTransacciones(transacciones) {
        this.transacciones = [];
        transacciones.forEach((transaccion) => this.transacciones.push(new Cl_mTransaccion(transaccion)));
    }
}
