import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vNewRegistro extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnHome: HTMLElement;

    // Callbacks para que el controlador gestione la navegación
    public onNavHome?: () => void;
    public onNavRegistroList?: () => void;

    constructor() {
        super({ formName: "RegistroFormDat" });

        // Inicializamos los botones (Asegúrate de que estos IDs existan en tu HTML)
        this.btnHome = this.crearHTMLElement("home");
        this.btnVolver = this.crearHTMLElement("volver");

        this.configurarEventos();
    }

    private configurarEventos() {
        // Al pulsar Home, avisamos al controlador para ir al Dashboard principal
        this.btnHome.onclick = () => {
            if (this.onNavHome) this.onNavHome();
        };

        // Al pulsar Volver, avisamos al controlador para regresar a la lista de registros
        this.btnVolver.onclick = () => {
            if (this.onNavRegistroList) this.onNavRegistroList();
        };
    }
}