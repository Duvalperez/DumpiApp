import { iCategoria } from "./Cl_mCategoria.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";

export default class cl_vConfiguracion extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnNewCategoria: HTMLElement;
    private SeccionCategorias: HTMLDivElement;
    
    
    public onNavHome?: () => void;
    public onNavNewCategoria?: () => void;
    constructor() {
        super({ formName: "listCategoria" });

        // Inicializamos el botón de retorno (asegúrate de que este ID exista en tu HTML)
        this.btnVolver = this.crearHTMLElement("Volver");
        this.SeccionCategorias = this.crearHTMLElement("dataCatg",{
            type:tHTMLElement.CONTAINER,
            refresh: () => this.SeccionCategoria(),

        })  as HTMLDivElement;
        this.btnNewCategoria = this.crearHTMLElement("AgregarCategoria")

        this.configurarEventos();

        this.refresh()
        this.controlador?.cargarCategoriasNuevas()
    }
    SeccionCategoria() {
        console.log("Activida")
        this.SeccionCategorias.innerHTML = ""
        let registros = this.controlador?.categoriaLista()
        if (!registros) return
        registros.forEach((regist: iCategoria, index: number) => {
            this.SeccionCategorias.innerHTML += `

          <tr class="card-row">
                        <td data-label="Categoria">${regist.nombre}</td>

                        <td style="display: flex;
                        justify-content: center;
                        align-items: center;">
                            <a id="listCategoria_btnBorrarRegistro_${index}"><img src="./resources/papelera-de-reciclaje.png" alt="Eliminar"
                                style="width: 30px; height: 30px;"></a>

                        </td>
                    </tr>
        `

        });
        registros.forEach((regist: iCategoria, index: number) => {
            this.crearHTMLButtonElement(`btnBorrarRegistro_${index}`, {
                onclick: () => this.eliminarCategoria(regist.nombre)
            })


        });
    }
    eliminarCategoria = (nombre: string) => {
        this.controlador?.deleteCategoria({
            nombre, callback: (error) => {
                if (!error)
                    alert("erro al eliminar")
                else this.SeccionCategoria()
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
        this.btnNewCategoria.onclick = () => {
            if (this.onNavNewCategoria) {
                this.onNavNewCategoria()
            }
        }
    }
}