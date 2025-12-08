import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vDashboard extends Cl_vGeneral {
    constructor() {
        super({ formName: "dashboardPrincipal" });
        this.btnRegistros = this.crearHTMLButtonElement("nuevoRegistro");
        this.btnEstadisticas = this.crearHTMLElement("btnEstadistica");
        this.btnConfiguracion = this.crearHTMLElement("btnConfiguracion");
        this.configurarEventos();
    }
    configurarEventos() {
        this.btnEstadisticas.onclick = () => {
            if (this.onNavEstadisticas)
                this.onNavEstadisticas();
        };
        this.btnConfiguracion.onclick = () => {
            if (this.onNavConfiguracion)
                this.onNavConfiguracion();
        };
        // Nueva lógica para el botón de registro
        this.btnRegistros.onclick = () => {
            if (this.onNavRegistro)
                this.onNavRegistro();
        };
    }
}
