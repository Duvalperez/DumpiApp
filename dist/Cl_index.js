window.onload = function () {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
        // Opción A: Redirigir a una página de error
        // window.location.href = "error-computadora.html";
        // Opción B: Borrar el contenido y mostrar un mensaje
        document.body.innerHTML = `
            <div style="text-align:center; padding-top:100px; font-family:sans-serif;">
                <h1>📱 Acceso restringido</h1>
                <p>Por favor, abre esta aplicación desde tu dispositivo móvil.</p>
            </div>`;
    }
};
import Cl_controlador from "./Cl_controlador.js";
import Cl_mCategoria from "./Cl_mCategoria.js";
import Cl_mMovimientos from "./Cl_mMovimientos.js";
import Cl_mRegistros from "./Cl_mRegistros.js";
export default class Cl_index {
    constructor() {
        this.modelo = new Cl_mRegistros();
        this.controlador = new Cl_controlador(this.modelo);
        this.cargarDatosDesdeStorage();
        this.controlador.ActulizarDatosVistas();
    }
    cargarDatosDesdeStorage() {
        const listaCategoria = localStorage.getItem("listCategoria");
        if (listaCategoria) {
            const parsedCategorias = JSON.parse(listaCategoria);
            parsedCategorias.forEach((cat) => {
                this.modelo.agregarCategoria({
                    nombre: new Cl_mCategoria(cat),
                    callback: () => { } // Callback vacío para carga inicial
                });
            });
        }
        const listaMovimientos = localStorage.getItem("listMovimientos");
        if (listaMovimientos) {
            const parsedMovimientos = JSON.parse(listaMovimientos);
            parsedMovimientos.forEach((mov) => {
                this.modelo.agregarMovimientos({
                    datMovimientos: new Cl_mMovimientos(mov),
                    callback: () => { }
                });
            });
        }
    }
}
// Iniciar la aplicación
new Cl_index();
