import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vNewCategoria extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnHome: HTMLElement;

    // Callbacks para comunicación con el controlador
    public onNavHome?: () => void;
    public onNavConfiguraciones?: () => void;

    constructor() {
        super({ formName: "newCategoria" });

        // Inicializamos los elementos (Asegúrate de que estos IDs existan en tu HTML)
        this.btnHome = this.crearHTMLElement("home");
        this.btnVolver = this.crearHTMLElement("volver");

        this.configurarEventos();
    }

    private configurarEventos() {
        // Al hacer clic en Home, avisamos al controlador para ir al Dashboard
        this.btnHome.onclick = () => {
            if (this.onNavHome) this.onNavHome();
        };

        // Al hacer clic en Volver, avisamos para ir a la lista de Configuraciones
        this.btnVolver.onclick = () => {
            if (this.onNavConfiguraciones) this.onNavConfiguraciones();
        };
    }
}