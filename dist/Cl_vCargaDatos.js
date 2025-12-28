import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vCargaDatos extends Cl_vGeneral {
    constructor() {
        super({ formName: "CargaDatos" });
        this.textoLabelBase = "Ingrese Datos Externos"; // Texto base para la etiqueta
        // 1. Inicialización de Elementos con IDs definitivos
        this.btnVolver = this.crearHTMLElement("Volver");
        this.btnHome = this.crearHTMLElement("Home");
        this.btnCargarDatos = this.crearHTMLButtonElement("Carga", {
            onclick: () => {
                this.datosCarga();
            }
        });
        this.inputArchivo = this.crearHTMLInputElement("inputArchivoDatos");
        this.datosCargados = this.crearHTMLElement("datosCargados");
        this.labelArchivo = this.crearHTMLLabelElement("inputArchivoDatos"); // Usamos el mismo ID que el 'for' del label
        // 2. Configuración de Eventos
        this.configurarEventos();
    }
    configurarEventos() {
        // --- Eventos de Navegación ---
        this.btnVolver.onclick = () => {
            if (this.onNavVolver)
                this.onNavVolver();
        };
        this.btnHome.onclick = () => {
            if (this.onNavHome)
                this.onNavHome();
        };
    }
    mostarDatosCargados() {
        var _a;
        if (!this.datosCargados)
            return;
        this.datosCargados.innerHTML = "";
        const movimientos = ((_a = this.controlador) === null || _a === void 0 ? void 0 : _a.movimientosBancoLista()) || [];
        let htmlTemplate = "";
        movimientos.forEach((movimiento, index) => {
            const esConciliado = movimiento.estatus === "CONCILIADO";
            htmlTemplate += `
            <tr class="card-row">
                <td data-label="Categoria">${movimiento.categoria || ''}</td>
                <td data-label="Referencia">${movimiento.referencia}</td>
                <td data-label="Descripcion">${movimiento.descripcion || ''}</td>
                <td data-label="Tipo">${movimiento.tipo}</td>
                <td data-label="Monto" class="${movimiento.tipo === 'Cargo' ? 'amount-negative' : 'amount-positive'}">
                    ${movimiento.monto}
                </td>
                <td data-label="Fecha">${movimiento.fecha}</td>
                <td>
                    <button id="btnAction__${index}" 
                            class="${esConciliado ? 'btn-conciliar' : 'btn-conciliar-red'}">
                        ${movimiento.estatus}
                    </button>
                </td>
            </tr>`;
        });
        this.datosCargados.innerHTML = htmlTemplate;
        movimientos.forEach((movimiento, index) => {
            const btn = document.getElementById(`btnAction__${index}`);
            if (btn) {
                btn.onclick = () => {
                    if (movimiento.estatus !== "CONCILIADO") {
                        this.cargarRegistro(movimiento.referencia);
                    }
                    else {
                    }
                };
            }
        });
    }
    cargarRegistro(referencia) {
        var _a, _b;
        let movimiento = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.obtenerMovimientoBanco(referencia);
        if (movimiento) {
            (_b = this.controlador) === null || _b === void 0 ? void 0 : _b.vNewRegistro.register(movimiento);
            if (this.onNavNewRegistro) {
                this.onNavNewRegistro();
            }
        }
    }
    datosCarga() {
        const inputArchivo = this.inputArchivo;
        const archivo = inputArchivo.files ? inputArchivo.files[0] : null;
        if (!archivo) {
            console.error("No se ha seleccionado ningún archivo.");
            return;
        }
        const lector = new FileReader();
        let datos = [];
        lector.onload = (event) => {
            var _a, _b;
            const contenido = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            try {
                datos = JSON.parse(contenido);
            }
            catch (error) {
                console.error("Error al cargar los datos:", error);
            }
            if (!datos) {
            }
            else {
                (_b = this.controlador) === null || _b === void 0 ? void 0 : _b.agregarMovimientoBanco(datos);
                console.log("Datos cargados correctamente:", datos);
                this.mostarDatosCargados();
            }
        };
        lector.readAsText(archivo);
    }
}
