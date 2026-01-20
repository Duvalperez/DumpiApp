import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class cl_vEstadisticas extends Cl_vGeneral {
    constructor() {
        super({ formName: "dashboardStadis" });
        this.categoriaEspecift = this.crearHTMLElement("categoriasRegistroMoney");
        this.Estadisticas = this.crearHTMLElement("balanceGn");
        this.btnCargarDatos = this.crearHTMLElement("CargarDatos");
        this.sectionRegistrosActivos = this.crearHTMLElement("historiasDisponibles");
        this.btnRegistros = this.crearHTMLButtonElement('ButtonStilo', {
            onclick: () => {
                var _a;
                (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.busqueda();
            }
        });
        this.btnVolver = this.crearHTMLElement("Volver");
        this.configurarEventos();
    }
    balanceGeneral() {
        var _a;
        this.Estadisticas.innerHTML = "";
        let datos = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.balanceGeneral();
        //quedamos en hacer la funcion que actualiza el select de la app me acoste a dormir porq tenia sueno ademas no hago videCodinng y pues que lala
        if (datos) {
            const { totalIngreso, totalEgresos, totalDisponible } = datos;
            if (totalDisponible) {
                this.Estadisticas.innerHTML = `
            <div class="balance-content">
                <div class="stats-text">
                    <p>Ingresos</p>
                    <span class="ingreso-color">${totalIngreso.toFixed(2)}<sub>Bs</sub></span>
                    <p>Egresos</p>
                    <span class="egreso-color">${totalEgresos.toFixed(2)}<sub>Bs</sub></span>
                    <p>Total Disponible</p>
                    <span class="disponible-color">${totalDisponible.toFixed(2)}<sub>Bs</sub></span>
                </div>
                <div class="" style="position: relative; height:200px; width:200px">
                    <canvas id="canvasBalance"></canvas>
                </div>
            </div>`;
                this.generarGrafico({ totalIngreso, totalEgresos });
            }
        }
    }
    registrosMes() {
        let textoDat = (this.sectionRegistrosActivos.value);
        let fechaBusqueda = textoDat.split(" ")[1];
        console.log(fechaBusqueda);
        return (fechaBusqueda);
    }
    registrosDisponibles() {
        var _a;
        const registros = ((_a = this.controlador) === null || _a === void 0 ? void 0 : _a.fechasActivas()) || [];
        this.sectionRegistrosActivos.innerHTML = registros
            .reverse()
            .map(fecha => `<option value="${fecha}">${fecha}</option>`)
            .join('');
    }
    // Estos errores son completamente  normales dado que la libreria de grafica se exporta desde el html
    generarGrafico(datosBalance) {
        const ctx = document.getElementById('canvasBalance').getContext('2d');
        if (this.miGrafico) {
            this.miGrafico.destroy();
        }
        this.miGrafico = new Chart(ctx, {
            type: 'doughnut',
            data: {
                // Definimos las etiquetas manualmente basadas en el objeto recibido
                labels: ['Ingresos', 'Egresos'],
                datasets: [{
                        // Extraemos los valores del objeto datosBalance
                        data: [datosBalance.totalIngreso, datosBalance.totalEgresos],
                        backgroundColor: [
                            '#2ecc71', // Verde para Ingresos
                            '#e74c3c' // Rojo para Egresos
                        ],
                        hoverOffset: 4,
                        borderWidth: 2
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '0%', // Hace el centro más grande para un look más fino
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
    categoriasDesglose() {
        var _a;
        this.categoriaEspecift.innerHTML = "";
        let categoriasList = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.categoriDesg();
        if (!categoriasList)
            return;
        categoriasList.forEach(item => {
            if (item.total == 0) {
            }
            else {
                this.categoriaEspecift.innerHTML +=
                    `<div class="category-card">
    <div class="card-header">
        <span class="category-name">${item.categoria}</span>
        <span class="category-amount">${item.total.toFixed(2)}<sub>Bs</sub></span>
    </div>
    
    
</div>`;
            }
        });
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
}
