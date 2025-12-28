import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class cl_vRegistro extends Cl_vGeneral {
    constructor() {
        super({ formName: "mainFormRegistros" });
        // Inicializamos el botón de volver (asegúrate de que el ID sea "Volver" en tu HTML)
        this.btnVolver = this.crearHTMLElement("Volver");
        this.btnNewRegistro = this.crearHTMLButtonElement("newRegistros");
        this.seccionDataList = this.crearHTMLElement("dataList");
        this.inputRefFiltro = this.crearHTMLInputElement("filtroReferencia");
        this.inputCategoriaFiltro = this.crearHTMLInputElement("filtroCategoria");
        this.inputMontoFiltro = this.crearHTMLInputElement("filtroMonto");
        this.inputFechaFiltro = this.crearHTMLInputElement("filtroFecha");
        this.seccionFiltros = this.crearHTMLElement("filtros");
        this.buttonBuscar = this.crearHTMLButtonElement("buscar", {
            onclick: () => {
                var _a;
                (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.mostrarVistaFiltrada();
                this.limpiarFormulario();
            }
        });
        this.datalist();
        this.SeccionRegistros = this.crearHTMLElement("datRegistros", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.datRegistros(),
        });
        this.configurarEventos();
        this.refresh();
    }
    limpiarFormulario() {
        this.inputRefFiltro.value = "";
        this.inputCategoriaFiltro.value = "";
        this.inputMontoFiltro.value = "";
        this.inputFechaFiltro.value = "";
    }
    datalist() {
        var _a;
        this.seccionDataList.innerHTML = "";
        let categoriasRegistradas = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.categoriaLista();
        if (!categoriasRegistradas)
            return;
        categoriasRegistradas.forEach((categorias) => {
            this.seccionDataList.innerHTML += `
         <option value="${categorias.nombre}"></option>
        `;
        });
    }
    movFiltrados() {
        var _a;
        this.seccionFiltros.open = false;
        this.SeccionRegistros.innerHTML = "";
        let movimientos = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.filtrosMovimientos({
            datMovimientos: {
                referencia: this.inputRefFiltro.value,
                categoria: this.inputCategoriaFiltro.value,
                monto: Number(this.inputMontoFiltro.value),
                fecha: this.inputFechaFiltro.value
            }, callback: (error) => { }
        });
        if (!movimientos)
            return;
        if (movimientos.length === 0) {
            this.datRegistros();
        }
        movimientos.forEach((mov, index) => {
            this.SeccionRegistros.innerHTML += `
        <tr class="card-row">
            <td data-label="Categoria">${mov.categoria}</td>
            <td data-label="Referencia">${mov.referencia}</td>
             <td data-label="Descripcion" class="contDescripcion"><p class="descripcion">${mov.descripcion}</p></td>
            <td data-label="Tipo">${mov.tipo}</td>
            <td data-label="Monto" class="amount-negative">${mov.monto.toFixed(2)}</td>
            <td data-label="Fecha">${mov.fecha}</td>
            <td data-label="Acciones">
               <a id="mainFormRegistros_btnBorrar__${index}"> <img src="./resources/papelera-de-reciclaje.png" alt="Eliminar" class="action-icon" style="height: 20px;"></a>
                <a id="mainFormRegistros_btnEditar__${index}"> <img src="./resources/editar-informacion.png" alt="editar" class="action-icon" style="height: 20px;"></a>
            </td>
        </tr>
    `;
        });
        movimientos.forEach((mov, index) => {
            this.crearHTMLButtonElement(`btnBorrar__${index}`, {
                onclick: () => this.eliminarMovimiento(mov.referencia)
            });
            this.crearHTMLButtonElement(`btnEditar__${index}`, {
                onclick: () => this.editarMovimiento(mov.referencia)
            });
        });
    }
    datRegistros() {
        var _a;
        this.SeccionRegistros.innerHTML = "";
        let movimientos = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.movimientosLista();
        if (!movimientos)
            return;
        movimientos.forEach((mov, index) => {
            this.SeccionRegistros.innerHTML += `
        <tr class="card-row">
            <td data-label="Categoria">${mov.categoria}</td>
            <td data-label="Referencia">${mov.referencia}</td>
            <td data-label="Descripcion" class="contDescripcion"><p class="descripcion">${mov.descripcion}</p></td>
            <td data-label="Tipo">${mov.tipo}</td>
            <td data-label="Monto" class="amount-negative">${mov.monto.toFixed(2)}</td>
            <td data-label="Fecha">${mov.fecha}</td>
            <td data-label="Acciones">
               <a id="mainFormRegistros_btnBorrar__${index}"> <img src="./resources/papelera-de-reciclaje.png" alt="Eliminar" class="action-icon" style="height: 20px;"></a>
                <a id="mainFormRegistros_btnEditar__${index}"> <img src="./resources/editar-informacion.png" alt="editar" class="action-icon" style="height: 20px;"></a>
            </td>
        </tr>
    `;
        });
        movimientos.forEach((mov, index) => {
            this.crearHTMLButtonElement(`btnBorrar__${index}`, {
                onclick: () => this.eliminarMovimiento(mov.referencia)
            });
            this.crearHTMLButtonElement(`btnEditar__${index}`, {
                onclick: () => this.editarMovimiento(mov.referencia)
            });
        });
    }
    editarMovimiento(referencia) {
        var _a, _b;
        let movimiento = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.obtenerMovimiento(referencia);
        (_b = this.controlador) === null || _b === void 0 ? void 0 : _b.vNewRegistro.edit(movimiento);
        this.btnNewRegistro.click();
    }
    eliminarMovimiento(referencia) {
        var _a;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.deleteMovimiento({
            referencia, callback: (error) => {
                if (!error)
                    alert("erro al eliminar");
                else
                    this.datRegistros();
            }
        });
    }
    configurarEventos() {
        // Al hacer clic, ejecutamos el callback que el controlador asignó
        this.btnVolver.onclick = () => {
            if (this.onNavHome) {
                this.onNavHome();
            }
        };
        this.btnNewRegistro.onclick = () => {
            if (this.onNavNewRegistro) {
                this.onNavNewRegistro();
            }
        };
    }
}
