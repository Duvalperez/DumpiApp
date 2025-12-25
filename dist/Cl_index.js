import Cl_controlador from "./Cl_controlador.js";
import Cl_mCategoria from "./Cl_mCategoria.js";
import Cl_mMovimientos from "./Cl_mMovimientos.js";
import Cl_mRegistros from "./Cl_mRegistros.js";
export default class Cl_index {
    constructor() {
        // 1. Inicializar Modelo y Controlador
        this.modelo = new Cl_mRegistros();
        this.controlador = new Cl_controlador(this.modelo);
        // 2. Cargar datos del almacenamiento persistente
        this.cargarDatosDesdeStorage();
        // 3. ¡IMPORTANTE! Forzar la actualización inicial de las vistas
        // Esto asegura que el Dashboard y las listas muestren los datos cargados
        this.controlador.ActulizarDatosVistas();
    }
    cargarDatosDesdeStorage() {
        // Cargar Categorías
        const listaCategoria = localStorage.getItem("listCategoria");
        if (listaCategoria) {
            const parsedCategorias = JSON.parse(listaCategoria);
            parsedCategorias.forEach((cat) => {
                this.modelo.agregarCategoria({
                    nombre: new Cl_mCategoria(cat),
                    callback: () => { } // Callback vacío para carga inicial
                });
            });
        }
        // Cargar Movimientos
        const listaMovimientos = localStorage.getItem("listMovimientos");
        if (listaMovimientos) {
            const parsedMovimientos = JSON.parse(listaMovimientos);
            parsedMovimientos.forEach((mov) => {
                this.modelo.agregarMovimientos({
                    datMovimientos: new Cl_mMovimientos(mov),
                    callback: () => { }
                });
            });
        }
    }
}
// Iniciar la aplicación
new Cl_index();
