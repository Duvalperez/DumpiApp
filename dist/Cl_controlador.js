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
        // --- Métodos de Consulta (GET) ---
        this.cantMovimientos = () => this.modelo.cantMovimientos();
        this.balanceGeneral = () => this.modelo.totales();
        this.movimientosBancoLista = () => this.modelo.listarMovimientosBanco();
        this.movimientosLista = () => this.modelo.listarMovimientos();
        this.categoriaLista = () => this.modelo.listar();
        this.categoriDesg = () => this.modelo.categoriasDesgolse();
        this.obtenerMovimiento = (ref) => this.modelo.movimiento(ref);
        // --- Control de UI ---
        this.cargarCategoriasNuevas = () => this.vRegistro.datalist();
        this.configuracionVis = () => this.VConfiguraciones.SeccionCategoria();
        this.vistaRegistros = () => this.vRegistro.datRegistros();
        this.mostrarVistaFiltrada = () => this.vRegistro.movFiltrados();
        this.modelo = modelo;
        // --- Inicialización de Vistas ---
        this.vNewCategori = new Cl_vNewCategori();
        this.vistaDashboard = new Cl_vDashboard();
        this.vEstadisticas = new cl_vEstadisticas();
        this.vRegistro = new cl_vRegistro();
        this.VConfiguraciones = new cl_vConfiguracion();
        this.vNewRegistro = new Cl_vNewRegistro();
        this.vCargarDatos = new Cl_vCargaDatos();
        // --- Inyección del Controlador ---
        const vistas = [
            this.vNewCategori, this.vistaDashboard, this.vEstadisticas,
            this.vRegistro, this.VConfiguraciones, this.vNewRegistro, this.vCargarDatos
        ];
        vistas.forEach(v => v.controlador = this);
        // --- Estado Inicial ---
        this.ocultarTodas();
        this.vistaDashboard.show({ ver: true });
        this.configurarNavegacion();
    }
    // --- Actualización de Datos ---
    ActulizarDatosVistas() {
        this.configuracionVis();
        this.categoriaLista();
        this.cargarCategoriasNuevas();
        this.vistaRegistros();
        this.vistaDashboard.actualizarTotales(this.modelo.cantMovimientos(), 0);
        this.movimientosLista();
        this.cargarEstadisticas();
    }
    // --- Configuración de Rutas/Navegación ---
    configurarNavegacion() {
        // Desde Dashboard
        this.vistaDashboard.onNavEstadisticas = () => this.mostrarUnaVista(this.vEstadisticas);
        this.vistaDashboard.onNavConfiguracion = () => this.mostrarUnaVista(this.VConfiguraciones);
        this.vistaDashboard.onNavRegistro = () => this.mostrarUnaVista(this.vRegistro);
        // Navegación de Formularios y Listas
        this.vRegistro.onNavNewRegistro = () => this.mostrarUnaVista(this.vNewRegistro);
        this.vNewRegistro.onNavRegistroList = () => this.mostrarUnaVista(this.vRegistro);
        this.VConfiguraciones.onNavNewCategoria = () => this.mostrarUnaVista(this.vNewCategori);
        this.vNewCategori.onNavConfiguraciones = () => this.mostrarUnaVista(this.VConfiguraciones);
        // Carga de Datos
        this.vEstadisticas.onNavCargaDatos = () => this.mostrarUnaVista(this.vCargarDatos);
        this.vCargarDatos.onNavVolver = () => this.mostrarUnaVista(this.vEstadisticas);
        // Retornos al Home (Dashboard) centralizados
        const irHome = () => this.mostrarUnaVista(this.vistaDashboard);
        this.vEstadisticas.onNavHome = irHome;
        this.VConfiguraciones.onNavHome = irHome;
        this.vRegistro.onNavHome = irHome;
        this.vNewCategori.onNavHome = irHome;
        this.vNewRegistro.onNavHome = irHome;
        this.vCargarDatos.onNavHome = irHome;
    }
    // --- Métodos de Escritura (POST/PUT/DELETE) ---
    agregarMovimientoBanco(datos) {
        this.modelo.agregarMovimientoBanco(datos);
    }
    agregarMovimiento({ datMovimientos, callback }) {
        this.modelo.agregarMovimientos({
            datMovimientos: new Cl_mMovimientos(datMovimientos),
            callback: (error) => callback(error)
        });
    }
    agregarCategoria({ categoriaDat, callback }) {
        this.modelo.agregarCategoria({
            nombre: new Cl_mCategoria(categoriaDat),
            callback: (error) => callback(error)
        });
    }
    editMovimiento({ referencia, datMovimientos, callback }) {
        this.modelo.editarMovimiento({
            referencia,
            datMovimientos,
            callback: (error) => {
                callback(error);
                this.vistaRegistros();
            }
        });
    }
    deleteMovimiento(params) {
        this.modelo.deleteMovimientos(params);
    }
    deleteCategoria(params) {
        this.modelo.deleteCategoria(params);
    }
    cargarEstadisticas() {
        this.vEstadisticas.categoriasDesglose();
        this.vEstadisticas.balanceGeneral();
    }
    filtrosMovimientos(params) {
        return this.modelo.filtros(params);
    }
    // --- Gestión de Visibilidad ---
    mostrarUnaVista(vistaDestino) {
        this.ocultarTodas();
        if (vistaDestino === this.vistaDashboard) {
            this.ActulizarDatosVistas();
        }
        vistaDestino.show({ ver: true });
    }
    ocultarTodas() {
        [
            this.vistaDashboard, this.vEstadisticas, this.vRegistro,
            this.VConfiguraciones, this.vNewCategori, this.vNewRegistro, this.vCargarDatos
        ].forEach(v => v.show({ ver: false }));
    }
}
