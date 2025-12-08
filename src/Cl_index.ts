import Cl_controlador from "./Cl_controlador.js";
import Cl_mRegistros from "./Cl_mRegistros.js";
import Cl_vDashboard from "./Cl_vDashboard.js";
import cl_vRegistro from "./Cl_VRegistro";

export default class Cl_index {
    private controlador: Cl_controlador;
    constructor() {
        
        let modelo = new Cl_mRegistros();

        this.controlador = new Cl_controlador(modelo);
        
    }
}