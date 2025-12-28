import { iMovimientos } from "./Cl_mMovimientos.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vCargaDatos extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnHome: HTMLElement;
    private btnCargarDatos: HTMLButtonElement;
    private inputArchivo: HTMLInputElement;
    private datosCargados: HTMLElement;
    private labelArchivo: HTMLLabelElement;
    private readonly textoLabelBase: string = "Ingrese Datos Externos"; // Texto base para la etiqueta


    public onNavVolver?: () => void;
    public onNavHome?: () => void;
    public onNavNewRegistro?: () => void;

    /**
     * Callback que se ejecuta cuando el usuario presiona 'Cargar Datos Nuevos'.
     * @param archivo El objeto File seleccionado por el usuario.
     */
    public onCargarDatos?: (archivo: File) => void;

    constructor() {
        super({ formName: "CargaDatos" });

        // 1. Inicialización de Elementos con IDs definitivos
        this.btnVolver = this.crearHTMLElement("Volver");
        this.btnHome = this.crearHTMLElement("Home");
        this.btnCargarDatos = this.crearHTMLButtonElement("Carga", {
            onclick: () => {
                this.datosCarga()


            }
        });
        this.inputArchivo = this.crearHTMLInputElement("inputArchivoDatos");
        this.datosCargados = this.crearHTMLElement("datosCargados");
        this.labelArchivo = this.crearHTMLLabelElement("inputArchivoDatos"); // Usamos el mismo ID que el 'for' del label

        // 2. Configuración de Eventos
        this.configurarEventos();
        
    }

    private configurarEventos() {
        // --- Eventos de Navegación ---
        this.btnVolver.onclick = () => {
            if (this.onNavVolver) this.onNavVolver();
        };

        this.btnHome.onclick = () => {
            if (this.onNavHome) this.onNavHome();
        };
        


    }
    mostarDatosCargados() {

        if (!this.datosCargados) return;
        this.datosCargados.innerHTML = "";

        const movimientos = this.controlador?.movimientosBancoLista() || [];


        let htmlTemplate = "";
        movimientos.forEach((movimiento: iMovimientos, index: number) => {
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


        movimientos.forEach((movimiento: iMovimientos, index: number) => {
            const btn = document.getElementById(`btnAction__${index}`);
            if (btn) {
                btn.onclick = () => {
                    if (movimiento.estatus !== "CONCILIADO") {
                        this.cargarRegistro(movimiento.referencia)

                    } else {

                    }
                };
            }
        });
    }

    cargarRegistro(referencia: string) {

        let movimiento = this.controlador?.obtenerMovimientoBanco(referencia)
        if (movimiento) {
            this.controlador?.vNewRegistro.register(movimiento);

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
        let datos: any = [];
        lector.onload = (event) => {

            const contenido = event.target?.result;
            try {
                datos = JSON.parse(contenido as string);


            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
            if (!datos) {

            }
            else {
                this.controlador?.agregarMovimientoBanco(datos);
                console.log("Datos cargados correctamente:", datos);
                this.mostarDatosCargados()
            }
        };
        lector.readAsText(archivo);

    }

}