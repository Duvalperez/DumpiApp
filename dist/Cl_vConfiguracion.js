import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class cl_vConfiguracion extends Cl_vGeneral {
    constructor() {
        super({ formName: "listCategoria" });
        // Inicializamos el botón de retorno (asegúrate de que este ID exista en tu HTML)
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
