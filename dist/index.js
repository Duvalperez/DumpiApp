import Cl_controlador from "./Cl_controlador.js";
import Cl_mFinanzas from "./Cl_mTransaccion.js"; // ✅ CORRECCIÓN 1: Ruta correcta del modelo contenedor
import Cl_vFinanzas from "./Cl_vTransaccion.js"; // Asumo que esta es la ruta correcta de la vista principal
export default class Cl_index {
    constructor() {
        // 1. Instanciar el Modelo (necesario para la persistencia)
        let modelo = new Cl_mFinanzas();
        // 2. Cargar los datos. La aplicación debe esperar a que los datos se carguen.
        modelo.cargar((error) => {
            if (error) {
                alert(error);
                throw new Error(error);
            }
            // 3. Crear instancias V-C y cerrar el ciclo (M-V-C).
            // Se instancia el Controlador primero con un placeholder para la Vista (Cl_vFinanzas).
            let controlador = new Cl_controlador(modelo, null);
            // 4. Instanciar la Vista, pasándole el Controlador (que ahora ya existe).
            // Esto satisface el constructor de Cl_vFinanzas.
            let vista = new Cl_vFinanzas(controlador);
            // 5. Cerrar el ciclo: Asignar la Vista instanciada al Controlador.
            controlador.vista = vista;
            // 6. Activar la vista inicial o refrescar el estado.
            // Ya que la vista está lista y tiene su controlador, podemos activarla.
            controlador.activarVista({ vista: "transacciones" });
        });
    }
}
