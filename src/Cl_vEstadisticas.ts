import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class cl_vEstadisticas extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnCargarDatos: HTMLElement;
    private Estadisticas: HTMLElement;

    // Callback para avisar al controlador que queremos regresar
    public onNavHome?: () => void;
    public onNavCargaDatos?: () => void

    // Nuevo método para que el controlador inyecte los datos
    public onActualizarEstadisticas?: (datos: any) => void;

    constructor() {
        super({ formName: "dashboardStadis" });

        this.Estadisticas = this.crearHTMLElement("dashboardStadistCont");
        this.btnCargarDatos = this.crearHTMLElement("CargarDatos");
        this.btnVolver = this.crearHTMLElement("Volver");
       
        this.configurarEventos();
    }
   
    private configurarEventos() {
        // Ambos botones navegan al Home
        this.btnVolver.onclick = () => {
            if (this.onNavHome) this.onNavHome();
        };

        this.btnCargarDatos.onclick = () => {
            if (this.onNavCargaDatos) this.onNavCargaDatos();
        };
    }


}