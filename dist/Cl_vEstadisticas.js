import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class cl_vEstadisticas extends Cl_vGeneral {
    constructor() {
        super({ formName: "dashboardStadis" });
        this.Estadisticas = this.crearHTMLElement("dashboardStadistCont");
        this.btnCargarDatos = this.crearHTMLElement("CargarDatos");
        this.btnVolver = this.crearHTMLElement("Volver");
        this.configurarEventos();
    }
    configurarEventos() {
        // Ambos botones navegan al Home
        this.btnVolver.onclick = () => {
            if (this.onNavHome)
                this.onNavHome();
        };
        this.btnCargarDatos.onclick = () => {
            if (this.onNavCargaDatos)
                this.onNavCargaDatos();
        };
    }
}
