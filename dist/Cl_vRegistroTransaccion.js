import Cl_vCategoria from "./Cl_vCategoria.js";
import Cl_vListCategoria from "./Cl_vListCategoria.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vRegistroTransaccion extends Cl_vGeneral {
    constructor() {
        super({ formName: "dashboardPrincipal" });
        this.vListCategoria = new Cl_vListCategoria();
        this.vListCategoria.show({ ver: false });
        this.vCategoria = new Cl_vCategoria();
        this.vCategoria.show({ ver: false });
        this.btnEstadisticas = this.crearHTMLButtonElement("btnEstadistica", {
            onclick: () => 0
        });
        this.btnConfiguraciones = this.crearHTMLButtonElement("btnConfiguracion", {
            onclick: () => 0
        });
        this.btnAgregar = this.crearHTMLButtonElement("nuevoRegistro", {
            onclick: () => 0
        });
    }
    set controlador(controlador) {
        super.controlador = controlador;
        this.vListCategoria.controlador = controlador;
        this.vCategoria.controlador = controlador;
    }
    get controlador() {
        return super.controlador;
    }
    activarVista({ vista, objeto, }) {
        this.show({ ver: vista === "dashboardPrincipal" });
        this.vListCategoria.show({ ver: vista === "listCategoria" });
        this.vCategoria.show({ ver: vista === "newCategoria", categoria: objeto });
    }
}
