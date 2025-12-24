import { iCategoria } from "./Cl_mCategoria.js";
import { iMovimientos } from "./Cl_mMovimientos.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";

export default class cl_vRegistro extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnNewRegistro: HTMLButtonElement;
    private SeccionRegistros: HTMLElement;
    private seccionDataList: HTMLElement;
    private inputRefFiltro: HTMLInputElement;
    private inputCategoriaFiltro: HTMLInputElement;
    private inputMontoFiltro: HTMLInputElement;
    private inputFechaFiltro: HTMLInputElement;
    private buttonBuscar: HTMLButtonElement;
    // Callback para que el controlador gestione el regreso al Dashboard
    public onNavHome?: () => void;
    public onNavNewRegistro?: () => void;
    constructor() {
        super({ formName: "mainFormRegistros" });

        // Inicializamos el botón de volver (asegúrate de que el ID sea "Volver" en tu HTML)
        this.btnVolver = this.crearHTMLElement("Volver");
        this.btnNewRegistro = this.crearHTMLButtonElement("newRegistros")
        this.seccionDataList = this.crearHTMLElement("dataList")
        this.inputRefFiltro = this.crearHTMLInputElement("filtroReferencia")
        this.inputCategoriaFiltro = this.crearHTMLInputElement("filtroCategoria")
        this.inputMontoFiltro = this.crearHTMLInputElement("filtroMonto")
        this.inputFechaFiltro = this.crearHTMLInputElement("filtroFecha")
        this.buttonBuscar = this.crearHTMLButtonElement("buscar", {
            onclick: () => this.controlador?.mostrarVistaFiltrada()
        });
        this.datalist();
        this.SeccionRegistros = this.crearHTMLElement("datRegistros",
            {
                type: tHTMLElement.CONTAINER,
                refresh: () => this.datRegistros(),
            }
        )
        this.configurarEventos();
        this.refresh();

    }

    datalist() {
        this.seccionDataList.innerHTML = ""
        let categoriasRegistradas = this.controlador?.categoriaLista();
        if (!categoriasRegistradas) return;
        categoriasRegistradas.forEach((categorias: iCategoria) => {
            this.seccionDataList.innerHTML += `
         <option value="${categorias.nombre}"></option>
        `})
    }
    movFiltrados() {
        this.SeccionRegistros.innerHTML = ""

        let movimientos = this.controlador?.filtrosMovimientos({datMovimientos:{
            referencia: this.inputRefFiltro.value,
            categoria: this.inputCategoriaFiltro.value,
            monto: Number(this.inputMontoFiltro.value),
            fecha: this.inputFechaFiltro.value
        } , callback: (error) => {}}) ;
        if (!movimientos) return;
        movimientos.forEach((mov: iMovimientos, index: number) => {
            this.SeccionRegistros.innerHTML += `
        <tr class="card-row">
            <td data-label="Categoria">${mov.categoria}</td>
            <td data-label="Referencia">${mov.referencia}</td>
            <td data-label="Descripcion">${mov.descripcion}</td>
            <td data-label="Tipo">${mov.tipo}</td>
            <td data-label="Monto" class="amount-negative">${mov.monto.toFixed(2)}</td>
            <td data-label="Fecha">${mov.fecha}</td>
            <td data-label="Acciones">
               <a id="mainFormRegistros_btnBorrar__${index}"> <img src="./resources/papelera-de-reciclaje.png" alt="Eliminar" class="action-icon" style="height: 20px;"></a>
                <a id="mainFormRegistros_btnEditar__${index}"> <img src="./resources/editar-informacion.png" alt="editar" class="action-icon" style="height: 20px;"></a>
            </td>
        </tr>
    `
        });
         movimientos.forEach((mov: iMovimientos, index: number) => {
            this.crearHTMLButtonElement(`btnBorrar__${index}`, {
                onclick: () => this.eliminarMovimiento(mov.referencia)
            })
            this.crearHTMLButtonElement(`btnEditar__${index}`, {
                onclick: () => this.editarMovimiento(mov.referencia)
            })


        });


    }

    datRegistros() {
        this.SeccionRegistros.innerHTML = ""

        let movimientos = this.controlador?.movimientosLista() ;
        if (!movimientos) return;
        movimientos.forEach((mov: iMovimientos, index: number) => {
            this.SeccionRegistros.innerHTML += `
        <tr class="card-row">
            <td data-label="Categoria">${mov.categoria}</td>
            <td data-label="Referencia">${mov.referencia}</td>
            <td data-label="Descripcion">${mov.descripcion}</td>
            <td data-label="Tipo">${mov.tipo}</td>
            <td data-label="Monto" class="amount-negative">${mov.monto.toFixed(2)}</td>
            <td data-label="Fecha">${mov.fecha}</td>
            <td data-label="Acciones">
               <a id="mainFormRegistros_btnBorrar__${index}"> <img src="./resources/papelera-de-reciclaje.png" alt="Eliminar" class="action-icon" style="height: 20px;"></a>
                <a id="mainFormRegistros_btnEditar__${index}"> <img src="./resources/editar-informacion.png" alt="editar" class="action-icon" style="height: 20px;"></a>
            </td>
        </tr>
    `
        });
         movimientos.forEach((mov: iMovimientos, index: number) => {
            this.crearHTMLButtonElement(`btnBorrar__${index}`, {
                onclick: () => this.eliminarMovimiento(mov.referencia)
            })
            this.crearHTMLButtonElement(`btnEditar__${index}`, {
                onclick: () => this.editarMovimiento(mov.referencia)
            })


        });


    }
    editarMovimiento(referencia: string) {
      let movimiento = this.controlador?.obtenerMovimiento(referencia);
      this.controlador?.vNewRegistro.edit(movimiento);
      
      this.btnNewRegistro.click();
    }
    eliminarMovimiento(referencia: string) {

        this.controlador?.deleteMovimiento({
            referencia, callback: (error) => {
                if (!error)
                    alert("erro al eliminar")
                else this.datRegistros()
            }
        })



    }

    private configurarEventos() {
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
        }
    }
}