import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vNewCategoria extends Cl_vGeneral {
    private btnVolver: HTMLElement;

    private btnAgregar: HTMLButtonElement;
    private inputCategoria: HTMLInputElement;

    // Callbacks para comunicación con el controlador
    public onNavHome?: () => void;
    public onNavConfiguraciones?: () => void;

    constructor() {
        super({ formName: "newCategoria" });
       

        // Inicializamos los elementos (Asegúrate de que estos IDs existan en tu HTML)
    
         this.inputCategoria = this.crearHTMLInputElement("inputCategoria")
        this.btnVolver = this.crearHTMLElement("volver");
        this.btnAgregar = this.crearHTMLButtonElement("agregar",
            {
                onclick: () => {this.Categoria(this.inputCategoria.value),
                        this.controlador?.configuracionVis()
                }

            }
        )

        this.configurarEventos();
    }


    private configurarEventos() {
        // Al hacer clic en Home, avisamos al controlador para ir al Dashboard
        

        // Al hacer clic en Volver, avisamos para ir a la lista de Configuraciones
        this.btnVolver.onclick = () => {
            if (this.onNavConfiguraciones) this.onNavConfiguraciones();
        };
    }
    Categoria(nombre: string) {
        if (nombre) {
                   this.inputCategoria.value = ""
        this.controlador!.agregarCategoria({
            categoriaDat: {
                nombre: nombre,

            },
            callback: (error: string | false) => {
                if (error) alert(error);
                this.refresh();
            },
            
        });
         if (this.onNavConfiguraciones) this.onNavConfiguraciones();
        }
       
        
    }
}