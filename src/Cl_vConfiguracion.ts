import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class cl_vConfiguracion extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnNewCategoria:HTMLElement;
    // Callback para avisar al controlador que queremos regresar al Dashboard
    public onNavHome?: () => void;
    public onNavNewCategoria?: () =>void;
    constructor() {
        super({ formName: "listCategoria" });

        // Inicializamos el botón de retorno (asegúrate de que este ID exista en tu HTML)
        this.btnVolver = this.crearHTMLElement("Volver");
        this.btnNewCategoria = this.crearHTMLElement("AgregarCategoria")
        this.configurarEventos();
    }

    private configurarEventos() {
        // Al hacer clic, ejecutamos el callback que el controlador asignó
        this.btnVolver.onclick = () => {
            if (this.onNavHome) {
                this.onNavHome();
            }
        };
        this.btnNewCategoria.onclick = () =>{
            if(this.onNavNewCategoria){
                this.onNavNewCategoria()
            }
        }
    }
}