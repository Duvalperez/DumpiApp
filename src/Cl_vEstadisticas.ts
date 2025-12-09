import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class cl_vEstadisticas extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnHome: HTMLElement;
    private Estadisticas:HTMLElement;

    // Callback para avisar al controlador que queremos regresar
    public onNavHome?: () => void;

    constructor() {
        super({ formName: "dashboardStadis" });

        // Inicializamos los elementos usando tus herramientas
        this.Estadisticas = this.crearHTMLElement("dashboardStadistCont")
        this.btnHome = this.crearHTMLElement("Home");
        this.btnVolver = this.crearHTMLElement("Volver"); // Corregido el nombre a Volver

        this.configurarEventos();
        this.renderizarEstadisticas();
    }

    private configurarEventos() {
        // Al hacer clic, le decimos al controlador que navegue al Home (Dashboard)
        this.btnVolver.onclick = () => {
            if (this.onNavHome) this.onNavHome();
        };

        this.btnHome.onclick = () => {
            if (this.onNavHome) this.onNavHome();
        };
    }
    public renderizarEstadisticas(){
        this.Estadisticas.innerHTML = `<div class="card card-default">
                <h2>Transacciones este Mes</h2>
                <span>24</span>
            </div>

            <div class="card card-expense">
                <h2>Día de Mayor Gasto</h2>
                <span>Viernes (15 Dic)</span>
            </div>

            <div class="card card-default">
                <h2>Categoría más Usada</h2>
                <span>Transporte</span>
            </div>

            <div class="card card-credit">
                <h2>Meta de Ahorro (Viajes)</h2>
                <span class="amount-positive">75% Completado</span>
            </div>

            <div class="card card-pending">
                <h2>Presupuesto Restante</h2>
                <span>$42.50</span>
            </div>

            <div class="card card-debit">
                <h2>Vs. Mes Anterior</h2>
                <span class="amount-negative">+ 12% Gasto</span>
            </div>

            <div class="card card-default">
                <h2>Gasto Promedio Diario</h2>
                <span>$12.30</span>
            </div>

            <div class="card card-pending">
                <h2>Suscripciones Activas</h2>
                <span class="badge">6</span>
            </div>

            <div class="card card-balance">
                <h2>Gasto Estimado a Fin de Mes</h2>
                <span>$1,450.00</span>
            </div>

            <div class="card card-credit">
                <h2>Ingreso Neto (Libre)</h2>
                <span class="amount-positive">$580.00</span>
            </div>`
    }
}