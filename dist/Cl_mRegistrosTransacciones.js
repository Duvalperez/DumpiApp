import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251129-2257";
import Cl_mCategoria from "./Cl_mCategoria.js";
import Cl_mTransaccion from "./Cl_mTransacion.js";
export default class cl_mRegistrosTransacciones {
    constructor() {
        this.tbMcategoria = "demo17.categoria";
        this.tbMtransaccion = "demo17.transanccion";
        this.db = new Cl_dcytDb({ aliasCuenta: "ATLAS" });
        this.categoria = [];
        this.transaccion = [];
    }
    addMateria({ dtCategorias, callback, }) {
        let categoria = new Cl_mCategoria(dtCategorias);
        // Validar que no exista otra categoria con el mismo código
        if (this.categoria.find((m) => m.categoria === dtCategorias.categoria))
            callback(`La categoria con código ${dtCategorias.categoria} ya existe.`);
        // Validar que la categoria sea correcta
        else if (!categoria.categoriaOk)
            callback(categoria.categoriaOk);
        // Guardar la categoria
        else
            this.db.addRecord({
                tabla: this.tbMcategoria,
                // registroAlias: dtCategorias.codigo,
                object: categoria,
                callback: ({ id, objects: categorias, error }) => {
                    if (!error)
                        this.llenarCategoria(categorias);
                    callback === null || callback === void 0 ? void 0 : callback(error);
                },
            });
    }
    deleteCategoria({ categoria, callback, }) {
        let indice = this.categoria.findIndex((m) => m.categoria === categoria);
        // Verificar si la categoria existe
        if (indice === -1)
            callback(`La categoria  ${categoria} no existe.`);
        else {
            // Verificar si están inscritos estudiantes en la categoria
            let algunInscrito = false;
            if (algunInscrito)
                callback(`No se puede eliminar "${categoria}" (en uso en un registro de transacción)`);
            // Eliminar la categoria
            else {
                this.db.deleteRecord({
                    tabla: this.tbMcategoria,
                    object: this.categoria[indice],
                    callback: ({ objects: categorias, error }) => {
                        if (!error)
                            this.llenarCategoria(categorias);
                        callback === null || callback === void 0 ? void 0 : callback(error);
                    },
                });
            }
        }
    }
    addTransaccion({ dtTransaccion, callback, }) {
        let existe = this.transaccion.find((e) => e.referencia === dtTransaccion.referencia);
        if (existe)
            callback(`la transaccion con la referencia ${dtTransaccion.referencia} ya existe.`);
        let transaccion = new Cl_mTransaccion(dtTransaccion);
        if (!transaccion.transaccionOk)
            callback(transaccion.transaccionOk);
        this.transaccion.push(transaccion);
        callback(false);
    }
    deleteTransaccion({ referencia, callback, }) {
        let indice = this.transaccion.findIndex((e) => e.referencia === referencia);
        if (indice === -1)
            callback(`La transaccion con referencia ${referencia} no existe.`);
    }
    dtCategorias() {
        return this.categoria.map((m) => m.toJSON());
    }
    dtTransaccion() {
        return this.transaccion.map((e) => e.toJSON());
    }
    cargar(callback) {
        // Obtener la información desde la Web Storage
        this.db.listRecords({
            tabla: this.tbMcategoria,
            callback: ({ objects, error }) => {
                if (error)
                    callback(`Error cargando categorias: ${error}`);
                else
                    this.db.listRecords({
                        tabla: this.tbMtransaccion,
                        callback: ({ transanccion, error }) => {
                            if (error)
                                callback(`Error cargando transacciones: ${error}`);
                            else {
                                this.llenarCategoria(objects !== null && objects !== void 0 ? objects : []);
                                this.llenarTransaccion(transanccion !== null && transanccion !== void 0 ? transanccion : []);
                                callback(false);
                            }
                        },
                    });
            },
        });
    }
    llenarCategoria(categoria) {
        this.categoria = [];
        categoria.forEach((categoria) => this.categoria.push(new Cl_mCategoria(categoria)));
    }
    llenarTransaccion(transaccion) {
        this.transaccion = [];
        transaccion.forEach((transaccion) => this.transaccion.push(new Cl_mTransaccion(transaccion)));
    }
}
