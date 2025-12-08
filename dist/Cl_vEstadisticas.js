import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class cl_vEstadisticas extends Cl_vGeneral {
    constructor() {
        super({ formName: "dashboardStadis" });
        // Inicializamos los elementos usando tus herramientas
        this.btnHome = this.crearHTMLElement("Home");
        this.btnVolver = this.crearHTMLElement("Volver"); // Corregido el nombre a Volver
        this.configurarEventos();
    }
    configurarEventos() {
        // Al hacer clic, le decimos al controlador que navegue al Home (Dashboard)
        this.btnVolver.onclick = () => {
            if (this.onNavHome)
                this.onNavHome();
        };
        this.btnHome.onclick = () => {
            if (this.onNavHome)
                this.onNavHome();
        };
    }
}
