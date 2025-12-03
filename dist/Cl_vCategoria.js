import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
import Cl_mCategoria from "./Cl_mCategoria.js"; // Asegúrate de que esta ruta sea correcta
/**
 * Clase de Vista para la ficha de Categoría (Agregar/Editar).
 * Hereda de Cl_vGeneral para la gestión de elementos del DOM.
 */
export default class Cl_vCategoria extends Cl_vGeneral {
    constructor() {
        // El formName es el ID de la <section> en el HTML
        super({ formName: "newCategoria" });
        // Atributos de la lógica
        this.opcion = null;
        this.categoria = new Cl_mCategoria();
        // 1. Elemento del Título (Asumiendo que hay un <h1> o <label> con ID 'newCategoria_lblTitulo')
        // Si queremos modificar el <h1> (ID=newCategoria_lblTitulo), necesitamos crearlo primero
        // NOTA: Tu HTML original tenía el <h1> sin ID. Si no puedes cambiar el HTML, 
        // usa el método 'crearHTMLLabelElement' si el H1 tiene un ID, o el método getHTML
        this.lblTitulo = this.crearHTMLLabelElement("lblTitulo", {
            refresh: () => {
                // Lógica para actualizar el título según la opción (aunque solo haya 'Agregar' en el HTML)
                const accion = this.opcion === opcionFicha.add ? "AGREGAR" : "EDITAR";
                this.lblTitulo.innerHTML = `${accion} CATEGORÍA`;
            },
        });
        // 2. Input para el Nombre (ID: newCategoria_categoria_newCategori)
        this.inNombre = this.crearHTMLInputElement("categoria_newCategori", {
            oninput: () => {
                // 1. Asignar el valor limpio al modelo
                this.inNombre.value = this.categoria.nombre = this.inNombre.value.trim();
                // 2. Refrescar la vista para revalidar el botón
                this.refresh();
            },
            refresh: () => 
            // 3. Validación de estilo (borde rojo si no es válido)
            (this.inNombre.style.borderColor = this.categoria.nombreOk
                ? ""
                : "red"),
        });
        // Se deshabilita la edición del nombre si la opción es 'EDIT'
        this.inNombre.disabled = this.opcion === opcionFicha.edit; // Se inicializa a false, se actualiza en show()
        // 3. Botón Aceptar/AGREGAR (ID: newCategoria_categoria_AgregarCategoria)
        this.btAceptar = this.crearHTMLButtonElement("categoria_AgregarCategoria", {
            onclick: () => this.aceptar(),
            refresh: () => {
                // Deshabilita el botón si el modelo no es válido
                this.btAceptar.disabled = this.categoria.categoriaOk !== true;
            },
        });
        // 4. Botones de Navegación (<a> se maneja como HTMLElement genérico)
        // Botón Volver (ID: newCategoria_newCategoria_volver)
        this.btVolver = this.crearHTMLElement("newCategoria_volver", {
            type: tHTMLElement.CONTAINER, // Esto asegura que lo busque como un elemento genérico
            onclick: () => this.controlador.activarVista({ vista: "transacciones" }),
        });
        // Botón Home (ID: newCategoria_newCategori_home)
        this.btHome = this.crearHTMLElement("newCategori_home", {
            type: tHTMLElement.CONTAINER, // Esto asegura que lo busque como un elemento genérico
            onclick: () => this.controlador.activarVista({ vista: "home" }),
        });
    }
    // --- Lógica de Aceptar (Guardar) ---
    aceptar() {
        if (this.opcion === opcionFicha.add)
            this.controlador.addCategoria({
                dtCategoria: this.categoria.toJSON(),
                callback: (error) => {
                    if (!error) {
                        this.controlador.activarVista({ vista: "transacciones" });
                    }
                    else {
                        alert(`Error al guardar categoría: ${error}`);
                    }
                },
            });
        // Si decides implementar la edición:
    }
    // --- Lógica de Mostrar Vista ---
    show({ ver = false, categoria: categoria, opcion, } = {
        ver: false,
    }) {
        super.show({ ver }); // Mostrar/Ocultar el contenedor principal
        if (ver && opcion) {
            this.opcion = opcion;
            // Asignación de datos al modelo y a la vista
            if (opcion === opcionFicha.add) {
                this.categoria = new Cl_mCategoria();
                this.inNombre.value = "";
            }
            else if (categoria) { // Para la edición
                // Clonamos la instancia recibida para no modificar el original antes de guardar
                this.categoria = new Cl_mCategoria(categoria.toJSON());
                this.inNombre.value = categoria.nombre;
            }
            // Controlar la edición: si es edición, el nombre podría deshabilitarse,
            // aunque generalmente en categorías se permite cambiar el nombre.
            // this.inNombre.disabled = this.opcion === opcionFicha.edit; 
            this.refresh();
        }
    }
}
