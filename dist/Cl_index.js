import Cl_controlador from "./Cl_controlador.js";
import cl_mRegistrosTransacciones from "./Cl_mRegistrosTransacciones.js";
import Cl_vRegistroTransaccion from "./Cl_vRegistroTransaccion.js";
export default class Cl_index {
    constructor() {
        let modelo = new cl_mRegistrosTransacciones();
        modelo.cargar((error) => {
            if (error)
                alert(error);
            if (error)
                throw new Error(error);
            let vista = new Cl_vRegistroTransaccion();
            let controlador = new Cl_controlador(modelo, vista);
            vista.controlador = controlador;
            vista.refresh();
        });
    }
}
