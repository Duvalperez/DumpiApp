import Cl_vDashboard from "./Cl_vDashboard.js";
import cl_vEstadisticas from "./Cl_vEstadisticas.js";
import cl_vRegistro from "./Cl_VRegistro.js";
import cl_vConfiguracion from "./Cl_vConfiguracion.js";
import Cl_vNewCategori from "./Cl_vNewCategoria.js";
import Cl_vNewRegistro from "./Cl_vNewRegistros.js";
import Cl_vCargaDatos from "./Cl_vCargaDatos.js";
import Cl_mCategoria from "./Cl_mCategoria.js";
import Cl_mMovimientos from "./Cl_mMovimientos.js";
export default class Cl_controlador {
    constructor(modelo) {
        this.modelo = modelo;
        this.vNewCategori = new Cl_vNewCategori();
        this.vNewCategori.controlador = this;
        this.vistaDashboard = new Cl_vDashboard();
        this.vistaDashboard.controlador = this;
        this.vEstadisticas = new cl_vEstadisticas();
        this.vEstadisticas.controlador = this;
        this.vRegistro = new cl_vRegistro();
        this.vRegistro.controlador = this;
        this.VConfiguraciones = new cl_vConfiguracion();
        this.VConfiguraciones.controlador = this;
        this.vNewRegistro = new Cl_vNewRegistro();
        this.vNewRegistro.controlador = this;
        this.vCargarDatos = new Cl_vCargaDatos();
        this.ocultarTodas();
        this.vistaDashboard.show({ ver: true });
        this.configurarNavegacion();
    }
    // -------------------------------------------------------------------------
    ActulizarDatosVistas() {
        this.cargarCategoriasNuevas();
        this.vistaRegistros();
        this.vistaDashboard.actualizarTotales(this.modelo.cantMovimientos(), 0);
        this.movimientosLista();
        this.vistaRegistros();
        this.cargarEstadisticas();
    }
    // -------------------------------------------------------------------------
    configurarNavegacion() {
        // --- Navegación DESDE el Dashboard ---
        this.vistaDashboard.onNavEstadisticas = () => {
            this.mostrarUnaVista(this.vEstadisticas);
        };
        // ... (resto de navegación existente) ...
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
        this.vRegistro.onNavNewRegistro = () => {
            this.mostrarUnaVista(this.vNewRegistro);
        };
        this.vNewCategori.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard);
        };
        this.vNewCategori.onNavConfiguraciones = () => {
            this.mostrarUnaVista(this.VConfiguraciones);
        };
        this.VConfiguraciones.onNavNewCategoria = () => {
            this.mostrarUnaVista(this.vNewCategori);
        };
        this.vNewRegistro.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard);
        };
        this.vNewRegistro.onNavRegistroList = () => {
            this.mostrarUnaVista(this.vRegistro);
        };
        this.vEstadisticas.onNavCargaDatos = () => {
            this.mostrarUnaVista(this.vCargarDatos);
        };
        this.vCargarDatos.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard);
        };
        this.vCargarDatos.onNavVolver = () => {
            this.mostrarUnaVista(this.vEstadisticas);
        };
    }
    //Logica para conexion de los datos---------------------------------------------------------//
    agregarMovimiento({ datMovimientos, callback }) {
        this.modelo.agregarMovimientos({
            datMovimientos: new Cl_mMovimientos(datMovimientos),
            callback: (error) => {
                callback(error);
            }
        });
    }
    agregarCategoria({ categoriaDat, callback, }) {
        this.modelo.agregarCategoria({
            nombre: new Cl_mCategoria(categoriaDat),
            callback: (error) => {
                callback(error);
            },
        });
    }
    deleteMovimiento({ referencia, callback, }) {
        this.modelo.deleteMovimientos({ referencia, callback });
    }
    deleteCategoria({ nombre, callback, }) {
        this.modelo.deleteCategoria({ nombre, callback });
    }
    cantMovimientos() {
        return this.modelo.cantMovimientos();
    }
    balanceGeneral() {
        return this.modelo.totales();
    }
    buscarReferencaia({ referencia, callback }) {
        return this.modelo.BuscarReferencia({ referencia, callback });
    }
    movimientosLista() {
        return this.modelo.listarMovimientos();
    }
    cargarCategoriasNuevas() {
        return this.vRegistro.datalist();
    }
    categoriaLista() {
        return this.modelo.listar();
    }
    configuracionVis() {
        this.VConfiguraciones.SeccionCategoria();
    }
    vistaRegistros() {
        this.vRegistro.datRegistros();
    }
    categoriDesg() {
        return this.modelo.categoriasDesgolse();
    }
    cargarEstadisticas() {
        this.vEstadisticas.categoriasDesglose();
        this.vEstadisticas.balanceGeneral();
    }
    //-----------------------------------------------------------------------------------------//
    mostrarUnaVista(vistaDestino) {
        this.ocultarTodas();
        // Cuando volvemos al dashboard, actualizamos los datos
        if (vistaDestino === this.vistaDashboard) {
            this.ActulizarDatosVistas();
        }
        vistaDestino.show({ ver: true });
    }
    ocultarTodas() {
        this.vistaDashboard.show({ ver: false });
        this.vEstadisticas.show({ ver: false });
        this.vRegistro.show({ ver: false });
        this.VConfiguraciones.show({ ver: false });
        this.vNewCategori.show({ ver: false });
        this.vNewRegistro.show({ ver: false });
        this.vCargarDatos.show({ ver: false });
    }
}
