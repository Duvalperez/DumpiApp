import Cl_vDashboard from "./Cl_vDashboard.js";
import cl_vEstadisticas from "./Cl_vEstadisticas.js";
import cl_vRegistro from "./Cl_VRegistro.js";
import cl_vConfiguracion from "./Cl_vConfiguracion.js";
export default class Cl_controlador {
    constructor(modelo) {
        this.modelo = modelo;
        this.vistaDashboard = new Cl_vDashboard();
        this.vEstadisticas = new cl_vEstadisticas();
        this.vRegistro = new cl_vRegistro();
        this.VConfiguraciones = new cl_vConfiguracion();
        this.ocultarTodas();
        this.vistaDashboard.show({ ver: true });
        this.configurarNavegacion();
    }
    configurarNavegacion() {
        // --- Navegación DESDE el Dashboard ---
        this.vistaDashboard.onNavEstadisticas = () => {
            this.mostrarUnaVista(this.vEstadisticas);
        };
        this.vistaDashboard.onNavConfiguracion = () => {
            this.mostrarUnaVista(this.VConfiguraciones);
        };
        this.vistaDashboard.onNavRegistro = () => {
            this.mostrarUnaVista(this.vRegistro);
        };
        // --- Navegación DE REGRESO al Dashboard ---
        this.vEstadisticas.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard);
        };
        this.VConfiguraciones.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard);
        };
        this.vRegistro.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard);
        };
    }
    mostrarUnaVista(vistaDestino) {
        this.ocultarTodas();
        vistaDestino.show({ ver: true });
    }
    ocultarTodas() {
        this.vistaDashboard.show({ ver: false });
        this.vEstadisticas.show({ ver: false });
        this.vRegistro.show({ ver: false });
        this.VConfiguraciones.show({ ver: false });
    }
}
