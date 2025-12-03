import Cl_mRegistros from "./Cl_mRegistros";
import Cl_mMovimientos, { IMovimientos } from "./Cl_mMovimientos";

import cl_vDashboard from "./Cl_vDashboard";
import cl_vRegistro from "./Cl_VRegistro"; 
import cl_vEstadisticas from "./Cl_vEstadisticas";
import cl_vConfiguracion from "./Cl_vConfiguracion";
import cl_vListMovimientos from "./Cl_vListMovimiento";
import Cl_mCategoria, { iCategoria } from "./Cl_mCategoria";

// Definimos la interfaz para la opción de la ficha, si no existe.
type opcionFicha = 'agregar' | 'editar' | 'ver' | 'eliminar'; 

export default class Cl_controlador {
    public modelo: Cl_mRegistros;
    public vista: cl_vDashboard; 

    constructor(modelo: Cl_mRegistros, vista: cl_vDashboard) {
        this.modelo = modelo;
        this.vista = vista;
    }

    // =========================================================
    // ================ GESTIÓN DE MOVIMIENTOS (CRUD) ==========
    // =========================================================

    /** Agrega un nuevo movimiento al modelo. */
addMovimiento({ movimiento, callback }: { movimiento: IMovimientos; callback: (error: string | false) => void; }): void {
    
    const movimientoInstancia = new Cl_mMovimientos(movimiento);
    
    // CORRECCIÓN LÓGICA: Si movimientoOk NO es false, es porque es el string de error.
    // Usamos el operador de negación (!) o comprobamos explícitamente si es una cadena.
    
    if (movimientoInstancia.movimientoOk) { 
        // Si movimientoInstancia.movimientoOk es truthy (es un string de error o true), 
        // significa que hubo un problema.
        
        // CORRECCIÓN para asegurar que el callback recibe lo que espera:
        // Si la validación es 'true' (éxito en la clase, pero error en el callback):
        if (movimientoInstancia.movimientoOk === true) {
            // Esto es un error lógico. Nunca debería ser 'true' aquí, si la validación falla.
            // Si llega a ser 'true' (éxito), no debe entrar en el if.
            
            // Asumiendo que el valor de éxito debe ser false. Si entra aquí, es error.
            callback("Error de validación desconocido."); 
            return;
        }
        
        // Si es un string (el mensaje de error):
        callback(movimientoInstancia.movimientoOk);
        return;
    }
    
    // Si la validación pasa (movimientoInstancia.movimientoOk es false o undefined/null):
    this.modelo.agregarMovimiento({
        movimiento: movimientoInstancia,
        callback,
    });
}
    /** Edita un movimiento existente en el modelo. */
    editMovimiento({ movimiento, callback }: { movimiento: IMovimientos; callback: (error: string | false) => void; }): void {
        this.modelo.editarMovimiento({
            movimiento, // Usamos 'movimiento'
            callback,
        });
    }

    /** Elimina un movimiento por su referencia. */
    deleteMovimiento({ referencia, callback }: { referencia: string; callback: (error: string | false) => void; }): void {
        this.modelo.deleteMovimiento({
            referencia,
            callback,
        });
    }
    
    // =========================================================
    // ================ GESTIÓN DE CATEGORÍAS (CRUD) ===========
    // =========================================================
    
    /** Agrega una nueva categoría al modelo. */
    addCategoria({ categoria, callback }: { categoria: iCategoria; callback: (error: string | false) => void; }): void {
    
    // 1. Crear una instancia de la CLASE (Cl_mCategoria) a partir del objeto de interfaz (iCategoria)
    const categoriaInstancia = new Cl_mCategoria(categoria);
    
    // 2. Llamar al modelo con la instancia de la clase
    this.modelo.agregarCategoria({
        categoria: categoriaInstancia, // <- Ahora es el tipo Cl_mCategoria
        callback,
    });
}

    /** Elimina una categoría por su nombre. */
    deleteCategoria({ nombre, callback }: { nombre: string; callback: (error: string | false) => void; }): void {
        this.modelo.deleteCategoria({
            nombre,
            callback,
        });
    }

    // =========================================================
    // ================== GETTERS / LISTADOS ===================
    // =========================================================

    /** Obtiene la lista completa de movimientos. */
    get movimientos(): IMovimientos[] {
        return this.modelo.listarMovimientos();
    }

    /** Obtiene la lista completa de categorías. */
    get categorias(): iCategoria[] {
        return this.modelo.listarCategoria();
    }

    /** Obtiene la lista de movimientos filtrados. */
    movimientosFiltrados(filtros: { fecha?: string; montoMin?: number; montoMax?: number; referencia?: string; categoria?: string; }): IMovimientos[] {
        return this.modelo.listarMovimientosFiltrados(filtros);
    }
    
    // =========================================================
    // =================== ANÁLISIS Y ESTADÍSTICAS =============
    // =========================================================

    /** Obtiene todas las estadísticas financieras clave. */
    obtenerEstadisticas() {
        return {
            balance: this.modelo.obtenerBalanceAnalisis(),
            desglose: this.modelo.desglosePorCategoria(),
            mayores: this.modelo.obtenerMayorCategoria(),
        };
    }

    // =========================================================
    // ==================== GESTIÓN DE VISTAS ==================
    // =========================================================

    /** Activa una vista específica, mostrando u ocultando otras si es necesario. */
    activarVista({
        vista,
        opcion,
        objeto,
    }: {
        vista: 'Dashboard' | 'Registro' | 'Estadisticas' | 'ListMovimientos' | 'Configuracion';
        opcion?: opcionFicha;
        objeto?: IMovimientos | iCategoria; 
    }): void {
        this.vista.activarVista({ vista, opcion, objeto }); 
    }
}