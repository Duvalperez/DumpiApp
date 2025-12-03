import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
/**
 * @class Cl_vCategorias
 * Vista para listar, agregar, editar y eliminar Categorías.
 */
export default class Cl_vCategorias extends Cl_vGeneral {
    constructor() {
        // formName es el ID de la sección principal
        super({ formName: "listCategoria" });
        // 1. Botón Agregar (ID: listCategoria_AgregarCategoria, que es un <a>)
        // Se usa 'crearHTMLElement' ya que no es un <button> estándar
        this.btAgregar = this.crearHTMLElement("AgregarCategoria", {
            type: tHTMLElement.CONTAINER,
            onclick: () => this.addCategoria(),
        });
        // 2. Botón Volver (ID: listCategoria_Volver, que es un <a>)
        this.btVolver = this.crearHTMLElement("Volver", {
            type: tHTMLElement.CONTAINER,
            // Asumo que vuelve a la vista de Transacciones o al menú principal (ucla)
            onclick: () => this.controlador.activarVista({ vista: "transacciones" }),
        });
        // 3. Contenedor de la lista (ID: configuracionCatg_dataCatg, que es un <tbody>)
        // Nota: El HTML usa el ID 'configuracionCatg_dataCatg', lo cual implica que el formName 
        // real del contenedor es 'configuracionCatg', pero lo forzaremos desde el formName base.
        this.divCategorias = this.crearHTMLElement("configuracionCatg_dataCatg", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarCategorias(),
        }); // Usamos HTMLTableSectionElement para <tbody>
    }
    // --- Lógica de Renderizado ---
    mostrarCategorias() {
        var _a;
        this.divCategorias.innerHTML = "";
        // Asumo que el controlador tiene un método dtCategorias
        let categorias = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.dtCategorias;
        if (!categorias)
            return;
        // 1. Crear el HTML (TRs dentro del TBODY)
        categorias.forEach((categoria, index) => {
            var _a;
            // Usaremos el 'id' del objeto como identificador único si está disponible,
            // o el 'nombre' si el 'id' es null (aunque en este contexto, el id es mejor).
            const uniqueId = (_a = categoria.id) !== null && _a !== void 0 ? _a : categoria.nombre.replace(/\s/g, '_');
            this.divCategorias.innerHTML +=
                `<tr class="card-row">
            <td data-label="Categoria">${categoria.nombre}</td>
            <td>
                <a id="${this.formName}_btEliminar_${index}_${uniqueId}"><img src="./resources/papelera-de-reciclaje.png" alt="Eliminar" style="width: 30px; height: 30px;"></a>
                <a id="${this.formName}_btEditar_${index}_${uniqueId}"><img src="./resources/editar-informacion.png" alt="Editar" style="width: 30px; height: 30px;"></a>
            </td>
        </tr>`;
        });
        // 2. Asignar Eventos (listeners) a los botones/iconos creados
        categorias.forEach((categoria, index) => {
            var _a;
            const uniqueId = (_a = categoria.id) !== null && _a !== void 0 ? _a : categoria.nombre.replace(/\s/g, '_');
            // Botón Editar (lo manejamos como HTMLElement genérico <a>)
            this.crearHTMLElement(`btEditar_${index}_${uniqueId}`, {
                type: tHTMLElement.CONTAINER,
                onclick: () => this.editarCategoria(categoria.id, categoria.nombre),
            });
            // Botón Eliminar (lo manejamos como HTMLElement genérico <a>)
            this.crearHTMLElement(`btEliminar_${index}_${uniqueId}`, {
                type: tHTMLElement.CONTAINER,
                onclick: () => this.deleteCategoria(categoria.id, categoria.nombre),
            });
        });
    }
    // --- Lógica de Navegación y CRUD ---
    addCategoria() {
        var _a;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.activarVista({
            vista: "newCategoria", // Nombre de la vista de la ficha (Cl_vCategoria)
            opcion: opcionFicha.add,
        });
    }
    editarCategoria(id, nombre) {
        var _a, _b;
        // Buscar la instancia completa de Cl_mCategoria
        let categoria = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.categoria(id);
        if (categoria)
            (_b = this.controlador) === null || _b === void 0 ? void 0 : _b.activarVista({
                vista: "newCategoria",
                opcion: opcionFicha.edit,
                objeto: categoria,
            });
    }
    deleteCategoria(id, nombre) {
        var _a;
        if (confirm(`¿Está seguro de eliminar la categoría "${nombre}"?`))
            (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.deleteCategoria({
                id, // Si el controlador usa el ID para eliminar
                callback: (error) => {
                    if (error)
                        alert(`No se pudo eliminar la categoría "${nombre}".\n${error}`);
                    else
                        this.mostrarCategorias(); // Refrescar la tabla
                },
            });
    }
    show({ ver = false, categoria, // Aceptado para compatibilidad con Cl_vFinanzas
    opcion, // Aceptado para compatibilidad con Cl_vFinanzas
     } = { ver: false }) {
        super.show({ ver });
        if (ver)
            this.mostrarCategorias();
        // Si tu vista de lista también contiene la ficha oculta y necesitas mostrarla, 
        // la lógica iría aquí, usando 'opcion' y 'categoria'
        if (opcion && categoria) {
            // Lógica para mostrar la ficha de categoría dentro de esta vista, si aplica.
        }
    }
}
