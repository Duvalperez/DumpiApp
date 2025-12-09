import Cl_mCategoria, { iCategoria } from "./Cl_mCategoria.js";
import Cl_mMovimientos, { IMovimientos } from "./Cl_mMovimientos.js";

export default class Cl_mRegistros {
    private movimientos: Cl_mMovimientos[] = [];
    private movimientosBanco: [] = [];
    private listcategoria: Cl_mCategoria[] = [];

    // --- MÉTODOS CRUD: CATEGORÍA ---
    public importarMovimientos(datos: any[]): void {
        datos.forEach(movimientoData => {
            try {
                // Asumiendo que el constructor de Cl_mMovimientos puede validar y crear la instancia
                const nuevoMovimiento = new Cl_mMovimientos(movimientoData as IMovimientos);
                
                // Puedes añadir validación de referencia única aquí antes de pushear
                // (Evitar duplicados)
                if (!this.movimientos.find(m => m.referencia === movimientoData.referencia)) {
                    this.movimientos.push(nuevoMovimiento);
                }
            } catch (e) {
                console.warn("Movimiento ignorado debido a datos inválidos:", movimientoData);
            }
        });
        // Guardar en LocalStorage después de la importación
        localStorage.setItem("movimiento", JSON.stringify(this.listarMovimientos()));
    }
    agregarCategoria({ categoria, callback }: { categoria: Cl_mCategoria; callback: (error: string | false) => void; }): void {
        let error = categoria.CategoriaOk;
        if (!error) { // Verifica si hay mensaje de error (string)
            callback(error);
            return;
        }
        let existe = this.listcategoria.find((c) => c.nombre === categoria.nombre)

        if (existe) {
            callback("La Categoria ya existe")
            return
        }
        this.listcategoria.push(categoria);
        localStorage.setItem("categoria", JSON.stringify(this.listarCategoria()))
        callback(false)
    }

    deleteCategoria({ nombre, callback }: { nombre: string; callback: (error: string | false) => void; }): void {
        let indice = this.listcategoria.findIndex((m) => m.nombre === nombre);

        if (indice < 0) {
            callback(`La categoría "${nombre}" no existe.`);
            return;
        }

        const ExisteEnMovimientos = this.movimientos.some((mov) =>
            mov.categoria === nombre
        );

        if (ExisteEnMovimientos) {
            callback(`No podemos borrar la categoría porque existe en algunos movimientos del registro.`);
            return;
        }

        this.listcategoria.splice(indice, 1);
        localStorage.setItem("categoria", JSON.stringify(this.listarCategoria()));
        callback(false);
    }

    // --- MÉTODOS CRUD: MOVIMIENTOS ---

    agregarMovimiento({ movimiento, callback }: { movimiento: Cl_mMovimientos; callback: (error: string | false) => void; }): void {
        let existe = this.movimientos.find((c) => c.referencia === movimiento.referencia)

        if (existe) {
            callback("Referencias Ya existente en el Sistema")
            return
        }
        this.movimientos.push(movimiento);
        // CORRECCIÓN: Debe usar listarMovimientos()
        localStorage.setItem("movimiento", JSON.stringify(this.listarMovimientos()))
        callback(false)
    }

    deleteMovimiento({ referencia, callback }: { referencia: string; callback: (error: string | false) => void; }): void {
        const index = this.movimientos.findIndex((m) => m.referencia === referencia);

        if (index === -1) {
            callback(`No se encontró ningún movimiento con la referencia: ${referencia}`);
            return;
        }

        this.movimientos.splice(index, 1);
        localStorage.setItem("movimiento", JSON.stringify(this.listarMovimientos()));
        callback(false);
    }

    editarMovimiento({ movimiento, callback }: { movimiento: IMovimientos; callback: (error: string | false) => void; }): void {
        let mov = new Cl_mMovimientos(movimiento);

        if (!mov.movimientoOk) { // Verifica si hay mensaje de error (string)
            callback(mov.movimientoOk);
            return;
        }

        const referenciaNueva = mov.referencia;
        const index = this.movimientos.findIndex((m) => m.referencia === referenciaNueva);

        if (index === -1) {
            callback(`No se encontró el movimiento con referencia: ${referenciaNueva} para editar.`);
            return;
        }

        this.movimientos[index] = mov;
        localStorage.setItem("movimiento", JSON.stringify(this.listarMovimientos()));
        callback(false);
    }

    // --- MÉTODOS DE LISTADO ---

    listarMovimientos(): IMovimientos[] {
        let lista: IMovimientos[] = [];
        this.movimientos.forEach((movimiento) => {
            lista.push(movimiento.toJSON());
        });
        return lista;
    }
    totalMovimientos(): number {
        return this.movimientos.length
    }
    totalMovimientosConciliados(): number {

        // 1. Usamos .filter() para seleccionar solo los movimientos del libro que cumplen la condición.
        const conciliados = this.movimientos.filter(movimientoLibro => {

            // 2. Condición: Usamos .some() para buscar la referencia en el array del banco.
            const referenciaEncontradaEnBanco = this.movimientosBanco.some((movimientoBanco: any) => {
                // Asumimos que los objetos en movimientosBanco tienen una propiedad 'referencia'.
                return movimientoBanco.referencia === movimientoLibro.referencia;
            });

            return referenciaEncontradaEnBanco; // Filtra y mantiene los que coinciden.
        });

        // 3. Devolvemos el conteo (número) de los elementos encontrados.
        return conciliados.length;
    }

    listarCategoria(): iCategoria[] {
        let lista: iCategoria[] = [];
        this.listcategoria.forEach((nombre) => {
            lista.push(nombre.toJSON());
        });
        return lista;
    }

    // =========================================================================================
    // ============================= NUEVOS MÉTODOS DE ANÁLISIS ================================
    // =========================================================================================

    // Calcula Monto Total Abonos, Monto Total Cargos y Saldo Final
    obtenerBalanceAnalisis(): {
        montoTotalAbonos: number;
        montoTotalCargos: number;
        saldoFinal: number;
    } {
        const TIPO_ABONO = "ABONO";
        const TIPO_CARGO = "CARGO";

        const resultado = this.movimientos.reduce((acumulador, mov) => {
            if (mov.tipo === TIPO_ABONO) {
                acumulador.montoTotalAbonos += mov.monto;
            } else if (mov.tipo === TIPO_CARGO) {
                acumulador.montoTotalCargos += mov.monto;
            }
            return acumulador;
        }, {
            montoTotalAbonos: 0,
            montoTotalCargos: 0,
            saldoFinal: 0,
        });

        resultado.saldoFinal = resultado.montoTotalAbonos - resultado.montoTotalCargos;

        return resultado;
    }

    // Realiza un Desglose por Categoría (Abonos, Cargos, Diferencial)
    desglosePorCategoria(): {
        [categoria: string]: {
            totalAbonos: number,
            totalCargos: number,
            diferencial: number
        }
    } {
        const TIPO_ABONO = "ABONO";
        const TIPO_CARGO = "CARGO";

        const desglose: { [categoria: string]: { totalAbonos: number, totalCargos: number, diferencial: number } } = {};

        this.movimientos.forEach((mov) => {
            if (!desglose[mov.categoria]) {
                desglose[mov.categoria] = { totalAbonos: 0, totalCargos: 0, diferencial: 0 };
            }

            if (mov.tipo === TIPO_ABONO) {
                desglose[mov.categoria].totalAbonos += mov.monto;
            } else if (mov.tipo === TIPO_CARGO) {
                desglose[mov.categoria].totalCargos += mov.monto;
            }
        });

        for (const cat in desglose) {
            desglose[cat].diferencial = desglose[cat].totalAbonos - desglose[cat].totalCargos;
        }

        return desglose;
    }

    // Identifica la Mayor Categoría de Gasto y la Mayor Categoría de Ingreso
    obtenerMayorCategoria(): {
        mayorGasto: { nombre: string, monto: number },
        mayorIngreso: { nombre: string, monto: number }
    } {
        const desglose = this.desglosePorCategoria();

        let mayorGasto = { nombre: "", monto: -1 };
        let mayorIngreso = { nombre: "", monto: -1 };

        for (const nombreCategoria in desglose) {
            const datos = desglose[nombreCategoria];

            if (datos.totalCargos > mayorGasto.monto) {
                mayorGasto = { nombre: nombreCategoria, monto: datos.totalCargos };
            }

            if (datos.totalAbonos > mayorIngreso.monto) {
                mayorIngreso = { nombre: nombreCategoria, monto: datos.totalAbonos };
            }
        }

        return { mayorGasto, mayorIngreso };
    }

    // --- MÉTODOS DE FILTRADO ---

    // Filtra movimientos por Fecha, Monto (Rango), Referencia y Categoría
    listarMovimientosFiltrados({
        fecha,
        montoMin,
        montoMax,
        referencia,
        categoria,
    }: {
        fecha?: string;
        montoMin?: number;
        montoMax?: number;
        referencia?: string;
        categoria?: string;
    }): IMovimientos[] {
        let resultados = this.movimientos;

        // Filtro por CATEGORÍA
        if (categoria && categoria.trim() !== "") {
            resultados = resultados.filter((mov) => mov.categoria === categoria);
        }

        // Filtro por REFERENCIA (búsqueda parcial)
        if (referencia && referencia.trim() !== "") {
            resultados = resultados.filter((mov) => mov.referencia.includes(referencia));
        }

        // Filtro por FECHA (día exacto)
        if (fecha && fecha.trim() !== "") {
            resultados = resultados.filter((mov) => mov.fecha === fecha);
        }

        // Filtro por MONTO (Rango)
        if (montoMin !== undefined || montoMax !== undefined) {
            resultados = resultados.filter((mov) => {
                const cumpleMin = montoMin === undefined || mov.monto >= montoMin;
                const cumpleMax = montoMax === undefined || mov.monto <= montoMax;
                return cumpleMin && cumpleMax;
            });
        }

        // Retorna la lista filtrada en formato IMovimientos[]
        return resultados.map(mov => mov.toJSON());
    }
}