import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vCargaDatos extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnHome: HTMLElement;
    private btnCargarDatos: HTMLButtonElement;
    private inputArchivo: HTMLInputElement;
    private datosCargados: HTMLElement;
    private labelArchivo: HTMLLabelElement;
    private readonly textoLabelBase: string = "Ingrese Datos Externos"; // Texto base para la etiqueta

    // --- DEFINICIÓN DE CALLBACKS ---
    public onNavVolver?: () => void;
    public onNavHome?: () => void;

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
                setTimeout(() => {
                    this.mostarDatosCargados("")
                }, 1000);
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
    mostarDatosCargados(datos: string) {
        this.datosCargados.innerText = "";
        const movimientos = this.controlador?.movimientosBancoLista();
        movimientos?.forEach((movimiento) => {
            
            this.datosCargados.innerHTML += `
            <tr class="card-row">
            <td data-label="Categoria">${movimiento.categoria}</td>
            <td data-label="Referencia">${movimiento.referencia}</td>
            <td data-label="Descripcion">${movimiento.descripcion}</td>
            <td data-label="Tipo">${movimiento.tipo}</td>
            <td data-label="Monto" class="amount-negative">${movimiento.monto.toFixed(2)}</td>
            <td data-label="Fecha">${movimiento.fecha}</td>
            <td >
              ${movimiento.estatus === "CONCILIADO" ?
                `<button class="btn-conciliar">CONCILIADO</button>` :
                `<button class="btn-conciliar-red">PENDIENTE</button>`}
               
            </td>
        </tr>
            `;
        });
    }

   
    datosCarga()  {

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
            if(!datos){

            }
            else{
                this.controlador?.agregarMovimientoBanco(datos);
                console.log("Datos cargados correctamente:", datos);
            }
        };
        lector.readAsText(archivo);
    }
}