import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
import Cl_mTransaccion from "./Cl_mRegistros.js";
/**
 * @class Cl_vTransaccion
 * Vista para la ficha de registro de Transacciones (Agregar/Editar).
 */
export default class Cl_vTransaccion extends Cl_vGeneral {
    constructor() {
        var _a;
        super({ formName: "RegistroFormDat" }); // ID de la sección principal
        // Atributos de la lógica
        this.opcion = null;
        this.transaccion = new Cl_mTransaccion();
        // 1. Navegación (<a> se maneja como HTMLElement)
        const navAnchors = (_a = this.vista) === null || _a === void 0 ? void 0 : _a.querySelectorAll("nav a");
        this.btVolver = this.crearHTMLElement("Volver", {
            type: tHTMLElement.CONTAINER,
            onclick: () => this.controlador.activarVista({ vista: "transacciones" })
        });
        this.btHome = this.crearHTMLElement("Home", {
            type: tHTMLElement.CONTAINER,
            onclick: () => this.controlador.activarVista({ vista: "home" })
        });
        // 2. Etiqueta de Tipo de Registro (Registro: <span id="conseForm_lblTipo">)
        // NOTA: El ID no sigue el patrón del formName, se asumirá que se busca "conseForm_lblTipo"
        this.lblTipo = this.crearHTMLLabelElement("conseForm_lblTipo", {
            refresh: () => {
                this.lblTipo.innerHTML = this.opcion === opcionFicha.add ? "Agregar" : "Editar";
            },
        });
        // --- Inputs de Datos ---
        // 3. Referencia (ID: RegistroFormDat_referencia)
        this.inReferencia = this.crearHTMLInputElement("referencia", {
            oninput: () => {
                this.transaccion.referencia = this.inReferencia.value;
                this.refresh();
            },
            refresh: () => { },
        });
        // 4. Descripción / Concepto (ID: RegistroFormDat_concepto)
        this.inDescripcion = this.crearHTMLInputElement("concepto", {
            oninput: () => {
                this.transaccion.descripcion = this.inDescripcion.value;
                this.refresh();
            },
            refresh: () => { },
        });
        // 5. Categoría (ID: RegistroFormDat_categoria)
        this.inCategoria = this.crearHTMLInputElement("categoria", {
            oninput: () => {
                this.transaccion.categoria = this.inCategoria.value;
                this.refresh();
            },
            refresh: () => { },
        });
        // 6. Monto (ID: RegistroFormDat_monto)
        this.inMonto = this.crearHTMLInputElement("monto", {
            oninput: () => {
                this.transaccion.monto = parseFloat(this.inMonto.value) || 0;
                this.refresh();
            },
            refresh: () => { },
        });
        // 7. Fecha (ID: RegistroFormDat_fecha)
        this.inFecha = this.crearHTMLInputElement("fecha", {
            // Tu HTML tiene doble ID, asumo que el correcto es RegistroFormDat_fecha
            oninput: () => {
                this.transaccion.fecha = this.inFecha.value;
                this.refresh();
            },
            refresh: () => { },
        });
        // --- Tipos de Movimiento (Checkboxes) ---
        const updateTipo = () => {
            if (this.chkIngreso.checked) {
                this.transaccion.tipo = "INGRESO";
                this.chkEgreso.checked = false; // Asegura que solo uno esté marcado
            }
            else if (this.chkEgreso.checked) {
                this.transaccion.tipo = "EGRESO";
                this.chkIngreso.checked = false; // Asegura que solo uno esté marcado
            }
            else {
                this.transaccion.tipo = "";
            }
            this.refresh();
        };
        // --- Dentro del constructor de Cl_vTransaccion ---
        // 8. Ingreso (ID: RegistroFormDat_tipoIngreso)
        this.chkIngreso = this.crearHTMLElement("tipoIngreso", {
            type: tHTMLElement.INPUT, // Ahora acepta el 'type'
            onchange: updateTipo,
            refresh: () => { }
        });
        // 9. Egreso (ID: RegistroFormDat_tipoEgreso)
        this.chkEgreso = this.crearHTMLElement("tipoEgreso", {
            type: tHTMLElement.INPUT, // Ahora acepta el 'type'
            onchange: updateTipo,
            refresh: () => { }
        });
        // 10. Botón Agregar (ID: RegistroFormDat_agregar)
        this.btAceptar = this.crearHTMLButtonElement("agregar", {
            onclick: () => this.aceptar(),
            refresh: () => {
                // Habilitar si el modelo es completamente válido
                this.btAceptar.disabled = this.transaccion.transaccionOk !== true;
            },
        });
    }
    // --- Lógica de Guardado ---
    aceptar() {
        if (this.opcion === opcionFicha.add) {
            this.controlador.addTransaccion({
                dtTransaccion: this.transaccion.toJSON(),
                callback: (error) => {
                    if (!error) {
                        this.controlador.activarVista({ vista: "transacciones" }); // Volver a la lista
                    }
                    else {
                        alert(`Error al guardar transacción: ${error}`);
                    }
                },
            });
        }
        else {
            // Lógica de Edición si aplica
            // this.controlador!.editTransaccion({ ... });
        }
    }
    // --- Lógica de Mostrar Vista ---
    show({ ver = false, transaccion: transaccion, opcion, } = { ver: false }) {
        super.show({ ver });
        if (ver && opcion) {
            this.opcion = opcion;
            if (opcion === opcionFicha.add) {
                this.transaccion = new Cl_mTransaccion();
                // Inicializar campos de la vista
                this.inReferencia.value = "";
                this.inDescripcion.value = "";
                this.inCategoria.value = "";
                this.inMonto.value = "0";
                this.inFecha.value = new Date().toISOString().split('T')[0]; // Fecha actual
                this.chkIngreso.checked = false;
                this.chkEgreso.checked = false;
            }
            // Lógica de edición
            else if (transaccion) {
                this.transaccion = new Cl_mTransaccion(transaccion.toJSON());
                this.inReferencia.value = transaccion.referencia;
                this.inDescripcion.value = transaccion.descripcion;
                this.inCategoria.value = transaccion.categoria;
                this.inMonto.value = transaccion.monto.toString();
                this.inFecha.value = transaccion.fecha;
                this.chkIngreso.checked = transaccion.tipo === "INGRESO";
                this.chkEgreso.checked = transaccion.tipo === "EGRESO";
            }
            this.refresh();
        }
    }
}
