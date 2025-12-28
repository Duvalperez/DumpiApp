export default class Cl_mRegistros {
    constructor() {
        this.movimientos = [];
        this.categorias = [];
        this.movimien = [];
    }
    agregarMovimientoBanco(dato) {
        this.movimien = dato.map((item) => {
            const existe = this.movimientos.find((e) => e.referencia.toLocaleLowerCase() == item.referencia.toLocaleLowerCase());
            let valor;
            if (existe != null) {
                valor = "CONCILIADO";
            }
            else {
                valor = "PENDIENTE";
            }
            return {
                referencia: item.referencia,
                descripcion: item.descripcion,
                categoria: item.categoria,
                monto: item.monto,
                tipo: item.tipo,
                fecha: item.fecha,
                estatus: valor
            };
        });
    }
    agregarMovimientos({ datMovimientos, callback, }) {
        let error = datMovimientos.error();
        if (error) {
            callback(error);
            return;
        }
        let existe = this.movimientos.find((c) => c.referencia === datMovimientos.referencia);
        if (existe) {
            callback("La referencia ya registrada");
            return;
        }
        this.movimientos.push(datMovimientos);
        localStorage.setItem("listMovimientos", JSON.stringify(this.listarMovimientos()));
        callback(false);
    }
    agregarCategoria({ nombre, callback, }) {
        // Validar que el nombre no tenga errores
        let error = nombre.error();
        if (error) {
            callback(error);
            return;
        }
        let existe = this.categorias.find((c) => c.nombre === nombre.nombre);
        if (existe) {
            callback("Categoria ya Registrada");
            return;
        }
        this.categorias.push(nombre);
        localStorage.setItem("listCategoria", JSON.stringify(this.listar()));
        callback(false);
    }
    movimiento(referencia) {
        let movimiento = this.movimientos.find((m) => m.referencia === referencia);
        return movimiento ? movimiento : null;
    }
    movimientoBanco(referencia) {
        let movimiento = this.movimien.find((m) => m.referencia === referencia);
        return movimiento ? movimiento : null;
    }
    editarMovimiento({ referencia, datMovimientos, callback, }) {
        let movimiento = this.movimientos.find((m) => m.referencia === referencia);
        if (!movimiento) {
            callback("Movimiento no encontrado");
            return;
        }
        movimiento.referencia = datMovimientos.referencia;
        movimiento.descripcion = datMovimientos.descripcion;
        movimiento.categoria = datMovimientos.categoria;
        movimiento.monto = datMovimientos.monto;
        movimiento.tipo = datMovimientos.tipo;
        movimiento.fecha = datMovimientos.fecha;
        localStorage.setItem("listMovimientos", JSON.stringify(this.listarMovimientos()));
        callback(false);
    }
    deleteMovimientos({ referencia, callback, }) {
        let indice = this.movimientos.findIndex((m) => m.referencia === referencia);
        this.movimientos.splice(indice, 1);
        localStorage.setItem("listMovimientos", JSON.stringify(this.listarMovimientos()));
        callback("Eliminada");
    }
    deleteCategoria({ nombre, callback }) {
        if (this.movimientos.find((m) => m.categoria === nombre)) {
            callback("No se puede eliminar la categoria porque tiene movimientos asociados");
            return;
        }
        let indice = this.categorias.findIndex((m) => m.nombre === nombre);
        this.categorias.splice(indice, 1);
        localStorage.setItem("listCategoria", JSON.stringify(this.listar()));
        callback("Eliminada");
    }
    cantMovimientos() {
        return this.movimientos.length;
    }
    filtros({ datMovimientos, callback }) {
        let filtrosAplicados = (this.movimientos.filter((e) => { var _a; return e.referencia.includes(((_a = datMovimientos.referencia) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) || ""); })
            .filter((e) => { var _a; return e.fecha.includes(((_a = datMovimientos.fecha) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) || ""); })
            .filter((e) => datMovimientos.categoria == "" ? true : e.categoria === datMovimientos.categoria)
            .filter((e) => e.monto > datMovimientos.monto - 1 || !datMovimientos.monto)
            .filter((e) => { var _a; return e.fecha.includes(((_a = datMovimientos.fecha) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) || ""); }));
        callback(false);
        console.log("actividad de los filtros", filtrosAplicados);
        return filtrosAplicados;
    }
    listarMovimientosBanco() {
        let lista = [];
        this.movimien.forEach((movimientos) => {
            lista.push({ referencia: movimientos.referencia, descripcion: movimientos.descripcion, categoria: movimientos.categoria, monto: movimientos.monto, tipo: movimientos.tipo, fecha: movimientos.fecha, estatus: movimientos.estatus });
        });
        console.log(lista);
        return lista;
    }
    listarMovimientos() {
        console.log(this.movimientos);
        let lista = [];
        this.movimientos.forEach((movimientos) => {
            lista.push(movimientos.toJSON());
        });
        return lista;
    }
    listar() {
        let lista = [];
        this.categorias.forEach((nombre) => {
            lista.push(nombre.toJSON());
        });
        return lista;
    }
    categoriasDesgolse() {
        const categoriasUnicas = [...new Set(this.movimientos.map((e) => e.categoria))];
        const resultado = categoriasUnicas.map((nombresegoria) => {
            const totalCargo = this.movimientos
                .filter((e) => e.categoria === nombresegoria)
                .filter((e) => e.tipo === "CARGO")
                .map((e) => e.monto)
                .reduce((total, montoActual) => total + montoActual, 0);
            return {
                categoria: nombresegoria,
                total: totalCargo
            };
        });
        return resultado;
    }
    totales() {
        const totalIngreso = this.movimientos
            .filter(e => e.tipo === "ABONO")
            .map(e => e.monto)
            .reduce((total, actual) => total + actual, 0);
        const totalEgresos = this.movimientos
            .filter(e => e.tipo === "CARGO")
            .map(e => e.monto)
            .reduce((total, actual) => total + actual, 0);
        const totalDisponible = totalIngreso - totalEgresos;
        return {
            totalIngreso,
            totalEgresos,
            totalDisponible
        };
    }
    OperacionesConciliadas() {
        let numero = 0;
        this.movimientos.forEach((item) => {
            const existe = this.movimien.find((e) => e.referencia === item.referencia);
            if (existe) {
                numero++;
            }
        });
        return numero;
    }
    registroInteligente() {
        // en trabajo 
    }
}
