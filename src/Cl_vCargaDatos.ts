import Cl_vGeneral from "./tools/Cl_vGeneral.js";

export default class Cl_vCargaDatos extends Cl_vGeneral {
    private btnVolver: HTMLElement;
    private btnHome: HTMLElement;
    private btnCargarDatos: HTMLButtonElement;
    private inputArchivo: HTMLInputElement;
    private labelArchivo: HTMLLabelElement;
    private readonly textoLabelBase: string = "Ingrese Datos Externos"; // Texto base para la etiqueta

    // --- DEFINICIÓN DE CALLBACKS ---
    public onNavVolver?: () => void;
    public onNavHome?: () => void;
    
    /**
     * Callback que se ejecuta cuando el usuario presiona 'Cargar Datos Nuevos'.
     * @param archivo El objeto File seleccionado por el usuario.
     */
    public onCargarDatos?: (archivo: File) => void; 

    constructor() {
        super({ formName: "CargaDatos" });

        // 1. Inicialización de Elementos con IDs definitivos
        this.btnVolver = this.crearHTMLElement("Volver");
        this.btnHome = this.crearHTMLElement("Home");
        this.btnCargarDatos = this.crearHTMLButtonElement("Carga"); 
        this.inputArchivo = this.crearHTMLInputElement("inputArchivoDatos"); 
        this.labelArchivo = this.crearHTMLLabelElement("inputArchivoDatos"); // Usamos el mismo ID que el 'for' del label

        // 2. Configuración de Eventos
        this.configurarEventos();
    }

    private configurarEventos() {
        // --- Eventos de Navegación ---
        this.btnVolver.onclick = () => {
            if (this.onNavVolver) this.onNavVolver();
        };

        this.btnHome.onclick = () => {
            if (this.onNavHome) this.onNavHome();
        };

        // --- Evento de Carga de Datos (al presionar el botón) ---
        this.btnCargarDatos.onclick = () => {
            const archivos = this.inputArchivo.files;
            
            if (archivos && archivos.length > 0) {
                const archivoSeleccionado = archivos[0];
                
                // Disparar el callback con el objeto File
                if (this.onCargarDatos) {
                    this.onCargarDatos(archivoSeleccionado);
                }
            } else {
                alert("Por favor, seleccione un archivo para cargar.");
            }
        };

        // --- Evento UX: Actualizar el Label al seleccionar un archivo ---
        this.inputArchivo.onchange = () => {
            this.actualizarNombreArchivo();
        };
    }
    
    /**
     * Actualiza el texto de la etiqueta (el área visible) para mostrar el nombre
     * del archivo que el usuario seleccionó, mejorando la UX.
     */
    private actualizarNombreArchivo() {
        const archivos = this.inputArchivo.files;
        
        if (archivos && archivos.length > 0) {
            // Reemplazar el texto del label con el nombre del archivo
            this.labelArchivo.innerText = `Archivo Seleccionado: ${archivos[0].name}`;
            
            // Si quieres que el texto "Ingrese Datos Externos" siempre esté visible,
            // puedes modificar el diseño de tu HTML para que el nombre del archivo
            // se muestre en otro span o elemento dentro de la etiqueta.
        } else {
            // Volver al texto original si el archivo es deseleccionado
            this.labelArchivo.innerText = this.textoLabelBase;
        }
    }
}