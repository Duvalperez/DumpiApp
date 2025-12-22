import { iMovimientos } from "./Cl_mMovimientos.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vNewRegistro extends Cl_vGeneral {

    private btnVolver: HTMLElement;
    private btnHome: HTMLElement;
    private inReferencia: HTMLInputElement;
    private inConcepto: HTMLInputElement;
    private inCategoria: HTMLInputElement;
    private inMonto: HTMLInputElement;
    private inFecha: HTMLInputElement;
    // Para el tipo (Ingreso/Egreso)
    private editMoviemiento: HTMLButtonElement;
    private inTipoIngreso: HTMLInputElement;
   

    private btnAceptarRegistro: HTMLButtonElement;

    // Callbacks para que el controlador gestione la navegación
    public onNavHome?: () => void;
    public onNavRegistroList?: () => void;

    constructor() {
        super({ formName: "RegistroFormDat" });

        // Inicializamos los botones (Asegúrate de que estos IDs existan en tu HTML)
        this.inReferencia = this.crearHTMLInputElement("referencia") as HTMLInputElement;
        this.inConcepto = this.crearHTMLInputElement("concepto") as HTMLInputElement;
        this.inCategoria = this.crearHTMLInputElement("categoria") as HTMLInputElement;
        this.inMonto = this.crearHTMLInputElement("monto") as HTMLInputElement;
        this.inFecha = this.crearHTMLInputElement("fecha") as HTMLInputElement;
        this.editMoviemiento = this.crearHTMLButtonElement("editarMovimiento",{
            onclick: () => {
                this.editarMovimiento()
            }
        }) as HTMLButtonElement;
        this.inTipoIngreso = this.crearHTMLInputElement("tipo") as HTMLInputElement;
     

        this.btnHome = this.crearHTMLElement("home");
        this.btnVolver = this.crearHTMLElement("volver");
        this.btnAceptarRegistro = this.crearHTMLButtonElement("agregar", {
            onclick: () => {
                this.agregarMov()


            }
        })
           this.btnAceptarRegistro.hidden = false;

        this.configurarEventos();
    }
   
    agregarMov() {

        this.controlador?.agregarMovimiento({
            datMovimientos: {
                referencia: this.inReferencia.value,
                descripcion: this.inConcepto.value,
                categoria: this.inCategoria.value,
                monto: this.inMonto.value,
                tipo: this.inTipoIngreso.value,
                fecha: this.inFecha.value

            },
            callback: (error: string | false) => {
                if (error) alert(error);
                this.refresh()
            }
        })

        this.controlador?.vistaRegistros()
        this.inReferencia.value = "",
            this.inConcepto.value = "",
            this.inCategoria.value = "",
            this.inMonto.value = "",
            this.inTipoIngreso.value = "",
            this.inFecha.value = ""
    }
    edit(datMovimientos: iMovimientos) {
            this.inReferencia.value = datMovimientos.referencia;
            this.inConcepto.value = datMovimientos.descripcion;
            this.inCategoria.value = datMovimientos.categoria;
            this.inMonto.value = datMovimientos.monto.toString();
            this.inTipoIngreso.value = datMovimientos.tipo;
            this.inFecha.value = datMovimientos.fecha;
            this.btnAceptarRegistro.hidden = true;
            this.editMoviemiento.hidden = false;
    }
    editarMovimiento() {
        
        this.controlador?.editMovimiento({
            referencia: this.inReferencia.value,
            datMovimientos: {
                
                referencia: this.inReferencia.value,
                descripcion: this.inConcepto.value,
                categoria: this.inCategoria.value,
                monto: this.inMonto.value,
                tipo: this.inTipoIngreso.value,
                fecha: this.inFecha.value

            },
            callback: (error: string | false) => {
                if (error) alert(error);
                this.refresh()
            }
            
        })
        this.inReferencia.value = "",
            this.inConcepto.value = "",
            this.inCategoria.value = "",
            this.inMonto.value = "",
            this.inTipoIngreso.value = "",
            this.inFecha.value = ""
    }
    private configurarEventos() {
        // Al pulsar Home, avisamos al controlador para ir al Dashboard principal
        this.btnHome.onclick = () => {
            if (this.onNavHome) this.onNavHome();
        };

        // Al pulsar Volver, avisamos al controlador para regresar a la lista de registros
        this.btnVolver.onclick = () => {
            if (this.onNavRegistroList) this.onNavRegistroList();
        };
    }

}