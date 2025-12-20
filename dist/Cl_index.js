import Cl_controlador from "./Cl_controlador.js";
import Cl_mCategoria from "./Cl_mCategoria.js";
import Cl_mMovimientos from "./Cl_mMovimientos.js";
import Cl_mRegistros from "./Cl_mRegistros.js";
export default class Cl_index {
    constructor() {
        // Inicializamos las propiedades
        this.modelo = new Cl_mRegistros();
        this.controlador = new Cl_controlador(this.modelo);
        let listaCategoria = localStorage.getItem("listCategoria");
        if (listaCategoria) {
            let listCategoria = JSON.parse(listaCategoria);
            // Ahora "this.modelo" sí existe
            listCategoria.forEach((categorias) => {
                this.modelo.agregarCategoria({
                    nombre: new Cl_mCategoria(categorias),
                    callback: (error) => {
                        // Ignorar errores al cargar desde localStorage
                    },
                });
            });
        }
        let listaMovimientos = localStorage.getItem("listMovimientos");
        if (listaMovimientos) {
            let listMovimientos = JSON.parse(listaMovimientos);
            listMovimientos.forEach((movimientos) => {
                this.modelo.agregarMovimientos({
                    datMovimientos: new Cl_mMovimientos(movimientos),
                    callback: (error) => {
                        // Ignorar errores al cargar desde localStorage
                    },
                });
            });
        }
    }
}
