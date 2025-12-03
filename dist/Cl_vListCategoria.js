import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
export default class Cl_vListCategoria extends Cl_vGeneral {
    constructor() {
        super({ formName: "listCategoria" });
        this.btnVolver = this.crearHTMLButtonElement("volver", {
            onclick: () => this.controlador.activarVista({ vista: "dashboard" }),
        });
        this.btAgregar = this.crearHTMLButtonElement("agregarCategoria", {
            onclick: () => this.controlador.activarVista({ vista: "newCategoria" }),
        });
        this.divCategoria = this.crearHTMLElement("divCategoria", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarCategorias(),
        });
    }
    mostrarCategorias() {
        var _a;
        this.divCategoria.innerHTML = "";
        let categoria = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.dtCategoria;
        if (!categoria)
            return;
        categoria.forEach((categoria, index) => (this.divCategoria.innerHTML += `
                <tr class="card-row">
                        <td data-label="Categoria">${categoria.nombre}</td>
                      
                        <td>
                            <a id= "listCategoria_Eliminar_${index}"><img src="./resources/papelera-de-reciclaje.png" alt="Eliminar"
                                style="width: 30px; height: 30px;"></a>
                           
                        </td>
                    </tr>
                `));
        categoria.forEach((categoria, index) => {
            this.crearHTMLButtonElement(`Eliminar_${index}`, {
                onclick: () => {
                    this.deleteCategoria(categoria.nombre);
                }
            });
        });
    }
    deleteCategoria(categoria) {
        var _a;
        if (confirm(`¿Está seguro de eliminar la categoria ${categoria}?`))
            (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.deleteCategoria({
                categoria,
                callback: (error) => {
                    if (error)
                        alert(`No se pudo eliminar la categoria ${categoria}.\n${error}`);
                    else
                        this.mostrarCategorias();
                },
            });
    }
    show({ ver }) {
        super.show({ ver });
        if (ver)
            this.mostrarCategorias();
    }
}
