import Cl_vGeneral from "./tools/Cl_vGeneral.js";
// Importar todas las vistas de la aplicación
import Cl_vCategorias from "./Cl_vCategorias.js";
import Cl_vTransaccion from "./Cl_vRegistros.js";
/**
 * @class Cl_vFinanzas
 * Contenedor de todas las vistas de la aplicación de finanzas.
 */
export default class Cl_vFinanzas extends Cl_vGeneral {
    // La clase Cl_vFinanzas sí requiere el controlador en su constructor
    constructor(controlador) {
        super({ formName: "appContainer" });
        this.vistas = [];
        this.controlador = controlador;
        // --- CORRECCIÓN DEL ERROR Expected 1 arguments, but got 0 ---
        // 1. Instanciar Cl_vCategorias SIN argumentos.
        this.vCategorias = new Cl_vCategorias();
        this.vCategorias.controlador = controlador;
        this.vistas.push(this.vCategorias);
        // 2. Instanciar Cl_vTransaccion SIN argumentos.
        this.vRegistro = new Cl_vTransaccion(); // Segundo error corregido: Llamada sin argumentos.
        this.vRegistro.controlador = controlador;
        this.vistas.push(this.vRegistro);
        // NOTA: Debes asegurarte de que los constructores de Cl_vCategorias 
        // y Cl_vTransaccion no exijan el argumento `controlador`.
    }
    /**
     * Muestra la vista solicitada y oculta las demás.
     * @param vista Nombre de la vista a activar.
     * @param opcion Si es 'add' o 'edit'.
     * @param objeto Objeto del modelo (Cl_mCategoria o Cl_mTransaccion) para editar.
     */
    activarVista({ vista, opcion, objeto, }) {
        // 1. Ocultar todas las vistas
        this.vistas.forEach((v) => v.show({ ver: false }));
        // 2. Activar la vista solicitada y forzar el tipo
        switch (vista) {
            case "categorias":
                this.vCategorias.show({ ver: true });
                break;
            case "newCategoria":
                // Forzamos el tipado para usar el 'show' extendido de Cl_vCategorias
                this.vCategorias.show({
                    ver: true,
                    categoria: objeto,
                    opcion
                });
                break;
            case "registro":
                // Forzamos el tipado para usar el 'show' extendido de Cl_vTransaccion
                this.vRegistro.show({
                    ver: true,
                    transaccion: objeto,
                    opcion
                });
                break;
            default:
                console.error(`Vista "${vista}" no encontrada.`);
                break;
        }
    }
}
