import cl_controlador from "./Cl_controlador";
import cl_vConfiguracion from "./Cl_vConfiguracion";
import cl_vEstadisticas from "./Cl_vEstadisticas";
import cl_vListMovimientos from "./Cl_vListMovimiento";
import cl_vRegistro from "./Cl_VRegistro";
import Cl_vGeneral from "./tools/Cl_vGeneral";

export default class cl_vDashboard extends Cl_vGeneral {

    private _vEstadisticas: cl_vEstadisticas;
    private _vConfiguraciones: cl_vConfiguracion;
    private _vListMovimientos: cl_vListMovimientos;
    private estadistica: HTMLElement;
    private configuracion: HTMLElement;
    private dashboard: HTMLElement;

    private registros: HTMLButtonElement;

    constructor() {
        super({ formName: "dashboardPrincipal" })

        this._vEstadisticas = new cl_vEstadisticas();
        this._vConfiguraciones = new cl_vConfiguracion();
        this._vListMovimientos = new cl_vListMovimientos();

        this.estadistica = this.crearHTMLElement("btnEstadistica");
        this.configuracion = this.crearHTMLElement("btnConfiguracion");
        this.registros = this.crearHTMLButtonElement("nuevoRegistro", {
            onclick: () => {
                this.show({ ver: false });
                this.vListMovimientos.show();
            }
        });
        this.dashboard = this.crearHTMLElement("contenedor")
        this.configuracion.addEventListener('click', (e) => {
            this.show({ ver: false });
            this.vConfiguracion.show();
        });
        this.estadistica.addEventListener('click', (e) => {
            onclick: () => {
                this.show({ ver: false })
                this.vEstadisticas.show();
            }
        })
        this.dashboard.innerHTML = "";
        this.vEstadisticas.show({ ver: false });
        this.vConfiguracion.show({ ver: false });
        this.vListMovimientos.show({ ver: false });
    }

    set controlador(controlador: cl_controlador) {
        super.controlador = controlador;
        this.vEstadisticas.controlador = controlador;
        this.vConfiguracion.controlador = controlador;
        this.vListMovimientos.controlador = controlador;
    }
    get vEstadisticas() {
        return this._vEstadisticas
    }


    get vConfiguracion() {
        return this._vConfiguraciones;
    }

    get vListMovimientos() {
        return this._vListMovimientos;
    }
    dashboardCuadros({
        contCantidadOperaciones,
        contOperacioneConciliadas,
    }: {
        contCantidadOperaciones: number;
        contOperacioneConciliadas: number;
    }): void {
        this.dashboard.innerHTML = `
        <div id="dashboardCont">
                <h3>Operaciones Registradas</h3>
                <p><span>${contCantidadOperaciones}</span></p>
            </div>
            <div id="dashboardCont">
                <h3>Operaciones Conciliadas</h3>
                <p><span>${contOperacioneConciliadas}</span></p>
            </div>
        `

    }
    show({ ver = true }: { ver?: boolean } = { ver: true }): void {
        super.show({ ver });
        if (ver) {
            this.vEstadisticas.show({ ver: false });
            this.vConfiguracion.show({ ver: false });
            this.vListMovimientos.show({ ver: false });
        }

    }
}