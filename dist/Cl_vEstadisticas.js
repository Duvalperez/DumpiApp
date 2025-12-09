import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class cl_vEstadisticas extends Cl_vGeneral {
    constructor() {
        super({ formName: "dashboardStadis" });
        this.Estadisticas = this.crearHTMLElement("dashboardStadistCont");
        this.btnCargarDatos = this.crearHTMLElement("CargarDatos");
        this.btnVolver = this.crearHTMLElement("Volver");
        this.configurarEventos();
        this.renderizarEstructuraInicial(); // Renderiza la estructura base
    }
    configurarEventos() {
        // Ambos botones navegan al Home
        this.btnVolver.onclick = () => {
            if (this.onNavHome)
                this.onNavHome();
        };
        this.btnCargarDatos.onclick = () => {
            if (this.onNavCargaDatos)
                this.onNavCargaDatos();
        };
    }
    // Método para crear la estructura HTML base y marcadores de datos
    renderizarEstructuraInicial() {
        this.Estadisticas.innerHTML = `
            <h2>💰 Resumen Financiero</h2>
            <div class="summary-grid">
                <div class="card card-balance">
                    <h3>SALDO INICIAL</h3>
                    <span id="stat_saldoInicial">$0.00</span>
                </div>

                <div class="card card-credit">
                    <h3>TOTAL INGRESOS (+)</h3>
                    <span id="stat_totalIngresos" class="amount-positive">$0.00</span>
                </div>

                <div class="card card-debit">
                    <h3>TOTAL EGRESOS (-)</h3>
                    <span id="stat_totalEgresos" class="amount-negative">$0.00</span>
                </div>

                <div class="card card-balance-final">
                    <h3>SALDO FINAL</h3>
                    <span id="stat_saldoFinal" class="amount-final">$0.00</span>
                </div>
            </div>

            <hr>

            <h2>📊 Desglose por Categoría</h2>
            <div id="desgloseCategoriaContenedor">
                <p class="placeholder-text">Cargando desglose...</p>
            </div>
            
            <hr>

            <h2>📈 Otras Métricas</h2>
            <div id="otrasMetricasContenedor">
                <div class="card card-default">
                    <h3>Transacciones este Mes</h3>
                    <span>0</span>
                </div>
                <div class="card card-default">
                    <h3>Gasto Promedio Diario</h3>
                    <span>$0.00</span>
                </div>
            </div>
        `;
    }
    /**
     * Inyecta los datos calculados en el HTML.
     * @param datos Objeto con {saldoInicial, totalIngresos, totalEgresos, saldoFinal, desglosePorCategoria}
     */
    actualizarEstadisticas(datos) {
        // Actualizar el resumen principal
        this.asignarValor("stat_saldoInicial", datos.saldoInicial);
        this.asignarValor("stat_totalIngresos", datos.totalIngresos);
        this.asignarValor("stat_totalEgresos", datos.totalEgresos);
        this.asignarValor("stat_saldoFinal", datos.saldoFinal);
        // Renderizar el desglose
        this.renderizarDesglose(datos.desglose);
    }
    asignarValor(id, valor) {
        const elemento = document.getElementById(id);
        if (elemento) {
            // Formatea el valor como moneda
            elemento.innerText = `$${valor.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        }
    }
    renderizarDesglose(desglose) {
        const contenedor = document.getElementById("desgloseCategoriaContenedor");
        if (!contenedor)
            return;
        let html = '';
        for (const categoria in desglose) {
            const datos = desglose[categoria];
            // Clase de color basada en el diferencial
            const difClass = datos.diferencial >= 0 ? 'amount-positive' : 'amount-negative';
            html += `
                <div class="card card-category-detail">
                    <h3>${categoria.toUpperCase()}</h3>
                    <p>Ingresos: <span class="amount-positive">$${datos.totalAbonos.toFixed(2)}</span></p>
                    <p>Egresos: <span class="amount-negative">$${datos.totalCargos.toFixed(2)}</span></p>
                    <p>Neto: <span class="${difClass}">$${datos.diferencial.toFixed(2)}</span></p>
                </div>
            `;
        }
        contenedor.innerHTML = html || '<p class="placeholder-text">No hay movimientos registrados para el desglose.</p>';
    }
}
