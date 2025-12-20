import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vNewCategoria extends Cl_vGeneral {
    constructor() {
        super({ formName: "newCategoria" });
        // Inicializamos los elementos (Asegúrate de que estos IDs existan en tu HTML)
        this.btnHome = this.crearHTMLElement("home");
        this.inputCategoria = this.crearHTMLInputElement("inputCategoria");
        this.btnVolver = this.crearHTMLElement("volver");
        this.btnAgregar = this.crearHTMLButtonElement("agregar", {
            onclick: () => {
                var _a;
                this.Categoria(this.inputCategoria.value),
                    (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.configuracionVis();
            }
        });
        this.configurarEventos();
    }
    configurarEventos() {
        // Al hacer clic en Home, avisamos al controlador para ir al Dashboard
        this.btnHome.onclick = () => {
            if (this.onNavHome)
                this.onNavHome();
        };
        // Al hacer clic en Volver, avisamos para ir a la lista de Configuraciones
        this.btnVolver.onclick = () => {
            if (this.onNavConfiguraciones)
                this.onNavConfiguraciones();
        };
    }
    Categoria(nombre) {
        this.inputCategoria.value = "";
        this.controlador.agregarCategoria({
            categoriaDat: {
                nombre: nombre,
            },
            callback: (error) => {
                if (error)
                    alert(error);
                this.refresh();
            },
        });
    }
}
