import Cl_controlador from "./Cl_controlador.js";
import Cl_mCategoria, { iCategoria } from "./Cl_mCategoria.js";
import Cl_mMovimientos, { iMovimientos } from "./Cl_mMovimientos.js";
import Cl_mRegistros from "./Cl_mRegistros.js";

export default class Cl_index {
    // Definimos las propiedades de la clase para que existan en "this"
    public controlador: Cl_controlador;
    public modelo: Cl_mRegistros;

    constructor() {
       
        // Inicializamos las propiedades
        this.modelo = new Cl_mRegistros();
        this.controlador = new Cl_controlador(this.modelo);

        let listaCategoria = localStorage.getItem("listCategoria");

        if (listaCategoria) {
            let listCategoria = JSON.parse(listaCategoria);

            // Ahora "this.modelo" sí existe
            listCategoria.forEach((categorias: iCategoria) => {
                this.modelo.agregarCategoria({
                    nombre: new Cl_mCategoria(categorias),
                    callback: (error: string | false) => {
                        // Ignorar errores al cargar desde localStorage
                    },
                });
            });
        }
        let listaMovimientos = localStorage.getItem("listMovimientos")
        if (listaMovimientos) {
            let listMovimientos = JSON.parse(listaMovimientos);
            listMovimientos.forEach((movimientos: iMovimientos) => {
                this.modelo.agregarMovimientos({
                    datMovimientos: new Cl_mMovimientos(movimientos),
                    callback: (error: string | false) => {
                        // Ignorar errores al cargar desde localStorage
                    },
                });
            });
        }
    }
}

