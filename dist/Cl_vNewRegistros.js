import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vNewRegistro extends Cl_vGeneral {
    constructor() {
        super({ formName: "RegistroFormDat" });
        this.inReferencia = this.crearHTMLInputElement("referencia");
        this.inConcepto = this.crearHTMLInputElement("concepto");
        this.inCategoria = this.crearHTMLInputElement("categoria");
        this.inMonto = this.crearHTMLInputElement("monto");
        this.inFecha = this.crearHTMLInputElement("fecha");
        this.inTipoIngreso = this.crearHTMLInputElement("tipo");
        this.labelTipoMetodo = this.crearHTMLLabelElement("TipOperacion");
        this.editMoviemiento = this.crearHTMLButtonElement("editarMovimiento", {
            onclick: () => this.editarMovimiento()
        });
        this.btnHome = this.crearHTMLElement("home");
        this.btnVolver = this.crearHTMLElement("volver");
        this.btnAceptarRegistro = this.crearHTMLButtonElement("agregar", {
            onclick: () => this.agregarMov()
        });
        this.configurarEventos();
        this.btnAceptarRegistro.hidden = false;
        this.labelTipoMetodo.innerText = "Nuevo Registro";
    }
    get formData() {
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
        var _a, _b;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.agregarMovimiento({
            datMovimientos: this.formData,
            callback: (error) => {
                if (error)
                    return alert(error);
                this.refresh();
            }
        });
        (_b = this.controlador) === null || _b === void 0 ? void 0 : _b.vistaRegistros();
        this.limpiarFormulario();
    }
    editarMovimiento() {
        var _a;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.editMovimiento({
            referencia: this.inReferencia.value,
            datMovimientos: this.formData,
            callback: (error) => {
                if (error)
                    return alert(error);
                this.refresh();
            }
        });
        this.limpiarFormulario();
        if (this.onNavRegistroList)
            this.onNavRegistroList();
    }
    edit(datMovimientos) {
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
    limpiarFormulario() {
        this.inReferencia.value = "";
        this.inConcepto.value = "";
        this.inCategoria.value = "";
        this.inMonto.value = "";
        this.inTipoIngreso.value = "";
        this.inFecha.value = "";
    }
    // Nuevo método para resetear el estado visual de la vista
    resetearVista() {
        this.labelTipoMetodo.innerText = "Nuevo Registro";
        this.inReferencia.readOnly = false;
        this.btnAceptarRegistro.hidden = false;
        this.editMoviemiento.hidden = true;
        this.limpiarFormulario();
    }
    configurarEventos() {
        this.btnHome.onclick = () => {
            if (this.onNavHome)
                this.onNavHome();
            this.resetearVista();
        };
        this.btnVolver.onclick = () => {
            if (this.onNavRegistroList)
                this.onNavRegistroList();
            this.resetearVista();
        };
    }
}
