import { iMovimientos } from "./Cl_mMovimientos.js";
import { movimientoBanco } from "./Cl_mRegistros.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vNewRegistro extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnHome: HTMLElement;
    private inReferencia: HTMLInputElement;
    private inConcepto: HTMLInputElement;
    private inCategoria: HTMLInputElement;
    private inMonto: HTMLInputElement;
    private inFecha: HTMLInputElement;
    private editMoviemiento: HTMLButtonElement;
    private inTipoIngreso: HTMLInputElement;
    private labelTipoMetodo: HTMLLabelElement;
    private btnAceptarRegistro: HTMLButtonElement;
    private btnReconversion: HTMLButtonElement;

    public onNavHome?: () => void;
    public onNavRegistroList?: () => void;

    constructor() {
        super({ formName: "RegistroFormDat" });

        this.inReferencia = this.crearHTMLInputElement("referencia") as HTMLInputElement;
        this.inConcepto = this.crearHTMLInputElement("concepto") as HTMLInputElement;
        this.inCategoria = this.crearHTMLInputElement("categoria") as HTMLInputElement;
        this.inMonto = this.crearHTMLInputElement("monto") as HTMLInputElement;
        this.inFecha = this.crearHTMLInputElement("fecha") as HTMLInputElement;
        this.inTipoIngreso = this.crearHTMLInputElement("tipo") as HTMLInputElement;
        this.labelTipoMetodo = this.crearHTMLLabelElement("TipOperacion") as HTMLLabelElement;

        this.editMoviemiento = this.crearHTMLButtonElement("editarMovimiento", {
            onclick: () => this.editarMovimiento()
        }) as HTMLButtonElement;
        this.btnReconversion = this.crearHTMLButtonElement("dolares",{
            onclick: ()=> this.obtensionMonto()
        })
        this.btnHome = this.crearHTMLElement("home");
        this.btnVolver = this.crearHTMLElement("volver");
        this.btnAceptarRegistro = this.crearHTMLButtonElement("agregar", {
            onclick: () => this.agregarMov()
        }) as HTMLButtonElement;

        this.configurarEventos();
        this.btnAceptarRegistro.hidden = false;
        this.labelTipoMetodo.innerText = "Nuevo Registro";
    }


    private get formData() {
        return {
            referencia: this.inReferencia.value,
            descripcion: this.inConcepto.value,
            categoria: this.inCategoria.value,
            monto: this.inMonto.value,
            tipo: this.inTipoIngreso.value,
            fecha: this.inFecha.value
        };
    }

    agregarMov() {
        this.controlador?.agregarMovimiento({
            datMovimientos: this.formData,
            callback: (error: string | false) => {
                if (error) return alert(error);
                this.refresh();
            }
        });

        this.controlador?.vistaRegistros();
        this.limpiarFormulario();
    }

    editarMovimiento() {
        this.controlador?.editMovimiento({
            referencia: this.inReferencia.value,
            datMovimientos: this.formData,
            callback: (error: string | false) => {
                if (error) return alert(error);
                this.refresh();
            }
        });
        this.limpiarFormulario();
        if (this.onNavRegistroList) this.onNavRegistroList();
    }
    register(datMovimientos: movimientoBanco) {
        this.labelTipoMetodo.innerText = "Registrar Movimiento";
        this.inReferencia.value = datMovimientos.referencia;
        this.inConcepto.value = datMovimientos.descripcion;
        this.inCategoria.value = datMovimientos.categoria;
        this.inMonto.value = datMovimientos.monto.toString();
        this.inTipoIngreso.value = datMovimientos.tipo;
        this.inFecha.value = datMovimientos.fecha;
        this.btnAceptarRegistro.hidden = false;
        this.editMoviemiento.hidden = true;

    }

    edit(datMovimientos: iMovimientos) {
        this.labelTipoMetodo.innerText = "Editar Movimiento";
        this.inReferencia.readOnly = true;
        this.inReferencia.value = datMovimientos.referencia;
        this.inConcepto.value = datMovimientos.descripcion;
        this.inCategoria.value = datMovimientos.categoria;
        this.inMonto.value = datMovimientos.monto.toString();
        this.inTipoIngreso.value = datMovimientos.tipo;
        this.inFecha.value = datMovimientos.fecha;

        this.btnAceptarRegistro.hidden = true;
        this.editMoviemiento.hidden = false;
    }
    async obtensionMonto() {
        const monto = Number(this.inMonto.value)
        if(monto > 0){
           const  Result  = await this.controlador?.ConversionMonto(monto)
           this.inMonto.value = Number(Result).toFixed(2)
          

        }

    }
  


    limpiarFormulario() {
        this.inReferencia.value = "";
        this.inConcepto.value = "";
        this.inCategoria.value = "";
        this.inMonto.value = "";
        this.inTipoIngreso.value = "";
        this.inFecha.value = "";
    }

    // Nuevo método para resetear el estado visual de la vista
    private resetearVista() {
        this.labelTipoMetodo.innerText = "Nuevo Registro";
        this.inReferencia.readOnly = false;
        this.btnAceptarRegistro.hidden = false;
        this.editMoviemiento.hidden = true;
        this.limpiarFormulario();
    }

    private configurarEventos() {
        this.btnHome.onclick = () => {
            if (this.onNavHome) this.onNavHome();
            this.resetearVista();
        };

        this.btnVolver.onclick = () => {
            if (this.onNavRegistroList) this.onNavRegistroList();
            this.resetearVista();
        };
    }
}