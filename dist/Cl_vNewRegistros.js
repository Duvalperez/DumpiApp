import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vNewRegistro extends Cl_vGeneral {
    constructor() {
        super({ formName: "RegistroFormDat" });
        // Inicializamos los botones (Asegúrate de que estos IDs existan en tu HTML)
        this.btnHome = this.crearHTMLElement("home");
        this.btnVolver = this.crearHTMLElement("volver");
        this.configurarEventos();
    }
    configurarEventos() {
        // Al pulsar Home, avisamos al controlador para ir al Dashboard principal
        this.btnHome.onclick = () => {
            if (this.onNavHome)
                this.onNavHome();
        };
        // Al pulsar Volver, avisamos al controlador para regresar a la lista de registros
        this.btnVolver.onclick = () => {
            if (this.onNavRegistroList)
                this.onNavRegistroList();
        };
    }
}
