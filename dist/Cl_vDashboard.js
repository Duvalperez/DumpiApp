import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vDashboard extends Cl_vGeneral {
    constructor() {
        super({ formName: "dashboardPrincipal" });
        this.btnRegistros = this.crearHTMLButtonElement("nuevoRegistro");
        this.btnEstadisticas = this.crearHTMLElement("btnEstadistica");
        this.btnConfiguracion = this.crearHTMLElement("btnConfiguracion");
        this.SeccionDat = this.crearHTMLElement("contenedorS");
        this.configurarEventos();
        this.renderizarDatosIniciales(); // Llamamos al método para pintar el HTML base
    }
    configurarEventos() {
        this.btnEstadisticas.onclick = () => {
            if (this.onNavEstadisticas)
                this.onNavEstadisticas();
        };
        this.btnConfiguracion.onclick = () => {
            if (this.onNavConfiguracion)
                this.onNavConfiguracion();
        };
        this.btnRegistros.onclick = () => {
            var _a;
            if (this.onNavRegistro)
                this.onNavRegistro();
            (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.cargarCategoriasNuevas();
        };
    }
    // Método independiente para renderizar el contenido dinámico
    renderizarDatosIniciales() {
        this.SeccionDat.innerHTML = `
            <div class="dashboard-card">
                <h3>Operaciones Registradas</h3>
                <p><span id="dashboard_totalRegistradas">0</span></p>
            </div>
            <div class="dashboard-card">
                <h3>Operaciones Conciliadas</h3>
                <p><span id="dashboard_totalConciliadas">0</span></p>
            </div>`;
    }
    // Método para que el controlador actualice los números reales
    actualizarTotales(registradas, conciliadas) {
        const spanReg = document.getElementById("dashboard_totalRegistradas");
        const spanCon = document.getElementById("dashboard_totalConciliadas");
        if (spanReg)
            spanReg.innerText = registradas.toString();
        if (spanCon)
            spanCon.innerText = conciliadas.toString();
    }
}
