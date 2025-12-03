import Cl_mRegistros from "./Cl_mRegistros";
import { IMovimientos } from "./Cl_mMovimientos"; 

import cl_vDashboard from "./Cl_vDashboard";
import cl_vRegistro from "./Cl_VRegistro"; 
import cl_vEstadisticas from "./Cl_vEstadisticas";
import cl_vConfiguracion from "./Cl_vConfiguracion";
import cl_vListMovimientos from "./Cl_vListMovimiento";
import { iCategoria } from "./Cl_mCategoria";

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
        this.modelo.agregarMovimiento({
            movimiento, // Usamos 'movimiento' en lugar de 'dtMovimiento'
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
        this.modelo.agregarCategoria({
            categoria, // Usamos 'categoria'
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