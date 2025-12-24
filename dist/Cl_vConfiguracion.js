import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class cl_vConfiguracion extends Cl_vGeneral {
    constructor() {
        var _a;
        super({ formName: "listCategoria" });
        this.eliminarCategoria = (nombre) => {
            var _a;
            (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.deleteCategoria({
                nombre, callback: (error) => {
                    if (!error)
                        alert("erro al eliminar");
                    else
                        this.SeccionCategoria();
                }
            });
        };
        // Inicializamos el botón de retorno (asegúrate de que este ID exista en tu HTML)
        this.btnVolver = this.crearHTMLElement("Volver");
        this.SeccionCategorias = this.crearHTMLElement("dataCatg", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.SeccionCategoria(),
        });
        this.btnNewCategoria = this.crearHTMLElement("AgregarCategoria");
        this.configurarEventos();
        this.refresh();
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.cargarCategoriasNuevas();
    }
    SeccionCategoria() {
        var _a;
        this.SeccionCategorias.innerHTML = "";
        let registros = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.categoriaLista();
        if (!registros)
            return;
        registros.forEach((regist, index) => {
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
        `;
        });
        registros.forEach((regist, index) => {
            this.crearHTMLButtonElement(`btnBorrarRegistro_${index}`, {
                onclick: () => this.eliminarCategoria(regist.nombre)
            });
        });
    }
    configurarEventos() {
        // Al hacer clic, ejecutamos el callback que el controlador asignó
        this.btnVolver.onclick = () => {
            if (this.onNavHome) {
                this.onNavHome();
            }
        };
        this.btnNewCategoria.onclick = () => {
            if (this.onNavNewCategoria) {
                this.onNavNewCategoria();
            }
        };
    }
}
