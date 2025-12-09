import Cl_mRegistros from "./Cl_mRegistros.js";
import Cl_vDashboard from "./Cl_vDashboard.js";
import cl_vEstadisticas from "./Cl_vEstadisticas.js";
import cl_vRegistro from "./Cl_VRegistro.js";
import cl_vConfiguracion from "./Cl_vConfiguracion.js";
import Cl_vNewCategoria from "./Cl_vNewCategoria.js";
import Cl_vNewRegistro from "./Cl_vNewRegistros.js";

export default class Cl_controlador {
    public modelo: Cl_mRegistros;
    public vistaDashboard: Cl_vDashboard;
    public vEstadisticas: cl_vEstadisticas;
    public vRegistro: cl_vRegistro;
    public VConfiguraciones: cl_vConfiguracion;
    public vNewCategoria: Cl_vNewCategoria;
    public vNewRegistro:Cl_vNewRegistro;
    constructor(modelo: Cl_mRegistros) {
        this.modelo = modelo;
        this.vNewCategoria = new Cl_vNewCategoria();
        this.vistaDashboard = new Cl_vDashboard();
        this.vEstadisticas = new cl_vEstadisticas();
        this.vRegistro = new cl_vRegistro();
        this.VConfiguraciones = new cl_vConfiguracion();
        this.vNewRegistro = new Cl_vNewRegistro()

        this.ocultarTodas();
        this.vistaDashboard.show({ ver: true });

        this.configurarNavegacion();
    }

    private configurarNavegacion() {
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
        this.vRegistro.onNavNewRegistro = () =>{
            this.mostrarUnaVista(this.vNewRegistro)
        }
        this.vNewCategoria.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard)
        }
        this.vNewCategoria.onNavConfiguraciones = () => {
            this.mostrarUnaVista(this.VConfiguraciones)
        }
        this.VConfiguraciones.onNavNewCategoria = () => {
            this.mostrarUnaVista(this.vNewRegistro)
        }
        this.vNewRegistro.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard);
        };

        this.vNewRegistro.onNavRegistroList = () => {
            this.mostrarUnaVista(this.vRegistro);
        };
    }

    private mostrarUnaVista(vistaDestino: any) {
        this.ocultarTodas();
        vistaDestino.show({ ver: true });
    }

    private ocultarTodas() {
        this.vistaDashboard.show({ ver: false });
        this.vEstadisticas.show({ ver: false });
        this.vRegistro.show({ ver: false });
        this.VConfiguraciones.show({ ver: false });
        this.vNewCategoria.show({ ver: false })
        this.vNewRegistro.show({ver:false})
    }
}