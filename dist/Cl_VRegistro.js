import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class cl_vRegistro extends Cl_vGeneral {
    constructor() {
        super({ formName: "mainFormRegistros" });
        // Inicializamos el botón de volver (asegúrate de que el ID sea "Volver" en tu HTML)
        this.btnVolver = this.crearHTMLElement("Volver");
        this.configurarEventos();
    }
    configurarEventos() {
        // Al hacer clic, ejecutamos el callback que el controlador asignó
        this.btnVolver.onclick = () => {
            if (this.onNavHome) {
                this.onNavHome();
            }
        };
    }
}
