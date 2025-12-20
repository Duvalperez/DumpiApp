import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vNewRegistro extends Cl_vGeneral {
    constructor() {
        super({ formName: "RegistroFormDat" });
        // Inicializamos los botones (Asegúrate de que estos IDs existan en tu HTML)
        this.inReferencia = this.crearHTMLInputElement("referencia");
        this.inConcepto = this.crearHTMLInputElement("concepto");
        this.inCategoria = this.crearHTMLInputElement("categoria");
        this.inMonto = this.crearHTMLInputElement("monto");
        this.inFecha = this.crearHTMLInputElement("fecha");
        this.inTipoIngreso = this.crearHTMLInputElement("tipo");
        this.btnHome = this.crearHTMLElement("home");
        this.btnVolver = this.crearHTMLElement("volver");
        this.btnAceptarRegistro = this.crearHTMLButtonElement("agregar", {
            onclick: () => {
                this.agregarMov();
            }
        });
        this.configurarEventos();
    }
    agregarMov() {
        var _a, _b;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.agregarMovimiento({
            datMovimientos: {
                referencia: this.inReferencia.value,
                descripcion: this.inConcepto.value,
                categoria: this.inCategoria.value,
                monto: this.inMonto.value,
                tipo: this.inTipoIngreso.value,
                fecha: this.inFecha.value
            },
            callback: (error) => {
                if (error)
                    alert(error);
                this.refresh();
            }
        });
        (_b = this.controlador) === null || _b === void 0 ? void 0 : _b.vistaRegistros();
        this.inReferencia.value = "",
            this.inConcepto.value = "",
            this.inCategoria.value = "",
            this.inMonto.value = "",
            this.inTipoIngreso.checked = false;
        this.inFecha.value = "";
    }
    configurarEventos() {
        // Al pulsar Home, avisamos al controlador para ir al Dashboard principal
        this.btnHome.onclick = () => {
            if (this.onNavHome)
                this.onNavHome();
        };
        // Al pulsar Volver, avisamos al controlador para regresar a la lista de registros
        this.btnVolver.onclick = () => {
            if (this.onNavRegistroList)
                this.onNavRegistroList();
        };
    }
}
