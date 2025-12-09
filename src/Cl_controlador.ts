import Cl_mRegistros from "./Cl_mRegistros.js";
import Cl_vDashboard from "./Cl_vDashboard.js";
import cl_vEstadisticas from "./Cl_vEstadisticas.js";
import cl_vRegistro from "./Cl_VRegistro.js";
import cl_vConfiguracion from "./Cl_vConfiguracion.js";
import Cl_vNewCategoria from "./Cl_vNewCategoria.js";
import Cl_vNewRegistro from "./Cl_vNewRegistros.js";
import Cl_vCargaDatos from "./Cl_vCargaDatos.js";

export default class Cl_controlador {
    public modelo: Cl_mRegistros;
    public vistaDashboard: Cl_vDashboard;
    public vEstadisticas: cl_vEstadisticas;
    public vRegistro: cl_vRegistro;
    public VConfiguraciones: cl_vConfiguracion;
    public vNewCategoria: Cl_vNewCategoria;
    public vNewRegistro:Cl_vNewRegistro;
    public vCargarDatos:Cl_vCargaDatos;

    constructor(modelo: Cl_mRegistros) {
        this.modelo = modelo;
        this.vNewCategoria = new Cl_vNewCategoria();
        this.vistaDashboard = new Cl_vDashboard();
        this.vEstadisticas = new cl_vEstadisticas();
        this.vRegistro = new cl_vRegistro();
        this.VConfiguraciones = new cl_vConfiguracion();
        this.vNewRegistro = new Cl_vNewRegistro()
        this.vCargarDatos = new Cl_vCargaDatos()


        this.ocultarTodas();
        this.vistaDashboard.show({ ver: true });

        this.configurarNavegacion();
        this.ActulizarDatosVistas();
        this.configurarCargaDatos(); // 👈 NUEVA: Vincula la lógica de archivo
    }
// -------------------------------------------------------------------------
    private ActulizarDatosVistas(){
        let registro = this.modelo.totalMovimientos()
        let conciliadas = this.modelo.totalMovimientosConciliados()
        this.vistaDashboard.actualizarTotales(registro,conciliadas);
    }
// -------------------------------------------------------------------------

    private configurarNavegacion() {
        // --- Navegación DESDE el Dashboard ---
        this.vistaDashboard.onNavEstadisticas = () => {
            this.mostrarUnaVista(this.vEstadisticas);
        };
        // ... (resto de navegación existente) ...
        this.vistaDashboard.onNavConfiguracion = () => {
            this.mostrarUnaVista(this.VConfiguraciones);
        };
        this.vistaDashboard.onNavRegistro = () => {
            this.mostrarUnaVista(this.vRegistro);
        };

        // --- Navegación DE REGRESO al Dashboard ---
        this.vEstadisticas.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard);
        };
        this.VConfiguraciones.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard);
        };
        this.vRegistro.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard);
        };
        this.vRegistro.onNavNewRegistro = () =>{
            this.mostrarUnaVista(this.vNewRegistro)
        }
        this.vNewCategoria.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard)
        }
        this.vNewCategoria.onNavConfiguraciones = () => {
            this.mostrarUnaVista(this.VConfiguraciones)
        }
        this.VConfiguraciones.onNavNewCategoria = () => {
            this.mostrarUnaVista(this.vNewRegistro)
        }
        this.vNewRegistro.onNavHome = () => {
            this.mostrarUnaVista(this.vistaDashboard);
        };

        this.vNewRegistro.onNavRegistroList = () => {
            this.mostrarUnaVista(this.vRegistro);
        };
        this.vEstadisticas.onNavCargaDatos = () =>{
            this.mostrarUnaVista(this.vCargarDatos)
        }
        this.vCargarDatos.onNavHome =()=>{
            this.mostrarUnaVista(this.vistaDashboard)
        }
        this.vCargarDatos.onNavVolver =()=>{
            this.mostrarUnaVista(this.vEstadisticas )
        }
    }
// -------------------------------------------------------------------------
    
    /**
     * Vincula el callback de la vista Cl_vCargaDatos con el método de manejo de archivos.
     */
    private configurarCargaDatos() {
        this.vCargarDatos.onCargarDatos = (archivo: File) => {
            this.manejarCargaArchivo(archivo);
        };
    }

    /**
     * Lee el contenido del archivo seleccionado (esperando JSON), lo parsea y lo pasa al Modelo.
     * @param archivo El objeto File proporcionado por la vista.
     */
    private manejarCargaArchivo(archivo: File) {
        // Validación básica de tipo (se puede mejorar)
        if (!archivo.name.toLowerCase().endsWith(".json") && !archivo.name.toLowerCase().endsWith(".js")) {
            alert("Tipo de archivo no válido. Solo se admiten archivos .json o .js.");
            return;
        }

        const reader = new FileReader();

        // Se ejecuta cuando el archivo es leído completamente
        reader.onload = (e) => {
            try {
                const contenidoTexto = e.target?.result as string; 
                
                // 1. Limpieza de posible 'export const dtMovimientosLibro =' si es un archivo .js
                let contenidoLimpio = contenidoTexto.trim();
                
                if (contenidoLimpio.startsWith("export const") || contenidoLimpio.startsWith("const")) {
                    // Intenta encontrar el primer '[' para aislar el array/JSON
                    const inicio = contenidoLimpio.indexOf('[');
                    const fin = contenidoLimpio.lastIndexOf(']');
                    
                    if (inicio !== -1 && fin !== -1) {
                         // Extrae solo el contenido JSON del array
                        contenidoLimpio = contenidoLimpio.substring(inicio, fin + 1);
                    } else {
                         throw new Error("Formato JS no estándar: No se encontró la estructura de array JSON.");
                    }
                }
                
                // 2. Parsear el contenido a JavaScript (JSON)
                const datosMovimientos = JSON.parse(contenidoLimpio); 

                // 3. Pasar los datos al Modelo
                this.modelo.importarMovimientos(datosMovimientos); 

                alert(`¡Carga exitosa! Se importaron ${datosMovimientos.length} movimientos.`);
                // Volver al Dashboard y actualizar los totales
                this.mostrarUnaVista(this.vistaDashboard); 

            } catch (error) {
                console.error("Error al leer o parsear el archivo:", error);
                alert("Error: El archivo no es un formato JSON/JS válido o está corrupto.");
            }
        };

        // Iniciar la lectura del archivo como texto
        reader.readAsText(archivo);
    }
// -------------------------------------------------------------------------

    private mostrarUnaVista(vistaDestino: any) {
        this.ocultarTodas();
        // Cuando volvemos al dashboard, actualizamos los datos
        if (vistaDestino === this.vistaDashboard) {
            this.ActulizarDatosVistas();
        }
        vistaDestino.show({ ver: true });
    }

    private ocultarTodas() {
        this.vistaDashboard.show({ ver: false });
        this.vEstadisticas.show({ ver: false });
        this.vRegistro.show({ ver: false });
        this.VConfiguraciones.show({ ver: false });
        this.vNewCategoria.show({ ver: false })
        this.vNewRegistro.show({ver:false})
        this.vCargarDatos.show({ver:false})
    }
}