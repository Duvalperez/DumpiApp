import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class cl_vRegistro extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnNewRegistro:HTMLButtonElement;
    // Callback para que el controlador gestione el regreso al Dashboard
    public onNavHome?: () => void;
    public onNavNewRegistro?: ()=> void;
    constructor() {
        super({ formName: "mainFormRegistros" });

        // Inicializamos el botón de volver (asegúrate de que el ID sea "Volver" en tu HTML)
        this.btnVolver = this.crearHTMLElement("Volver");
        this.btnNewRegistro = this.crearHTMLButtonElement("newRegistros")
        this.configurarEventos();
    }

    private configurarEventos() {
        // Al hacer clic, ejecutamos el callback que el controlador asignó
        this.btnVolver.onclick = () => {
            if (this.onNavHome) {
                this.onNavHome();
            }
        };
        this.btnNewRegistro.onclick = () =>{
            if(this.onNavNewRegistro){
                this.onNavNewRegistro();
            }
        }
    }
}