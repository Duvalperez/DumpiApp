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
                setTimeout(() => {
                    this.mostarDatosCargados("");
                }, 1000);
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
    mostarDatosCargados(datos) {
        var _a;
        this.datosCargados.innerText = "";
        const movimientos = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.movimientosBancoLista();
        movimientos === null || movimientos === void 0 ? void 0 : movimientos.forEach((movimiento) => {
            this.datosCargados.innerHTML += `
            <tr class="card-row">
            <td data-label="Categoria">${movimiento.categoria}</td>
            <td data-label="Referencia">${movimiento.referencia}</td>
            <td data-label="Descripcion">${movimiento.descripcion}</td>
            <td data-label="Tipo">${movimiento.tipo}</td>
            <td data-label="Monto" class="amount-negative">${movimiento.monto.toFixed(2)}</td>
            <td data-label="Fecha">${movimiento.fecha}</td>
            <td data-label="Acciones">

                <a id="mainFormRegistros_btnBorrar__${movimiento.referencia}"> <img src="./resources/papelera-de-reciclaje.png" alt="Eliminar" class="action-icon" style="height: 20px;"></a>
                <a id="mainFormRegistros_btnEditar__${movimiento.referencia}"> <img src="./resources/editar-informacion.png" alt="editar" class="action-icon" style="height: 20px;"></a>
            </td>
        </tr>
            `;
        });
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
            }
        };
        lector.readAsText(archivo);
    }
}
