export default class Cl_mRegistros {
    constructor() {
        this.movimientos = [];
        this.categorias = [];
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
        // Validar que no se repita el teléfono
        let existe = this.categorias.find((c) => c.nombre === nombre.nombre);
        if (existe) {
            callback("El número de teléfono ya está registrado.");
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
        let indice = this.categorias.findIndex((m) => m.nombre === nombre);
        this.categorias.splice(indice, 1);
        localStorage.setItem("listCategoria", JSON.stringify(this.listar()));
        callback("Eliminada");
    }
    cantMovimientos() {
        return this.movimientos.length;
    }
    //Busqueda por referencia
    BuscarReferencia({ referencia, callback, }) {
        console.log(this.movimientos.find((e) => e.referencia === referencia));
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
        const resultado = categoriasUnicas.map((nombreCategoria) => {
            const totalCargo = this.movimientos
                .filter((e) => e.categoria === nombreCategoria)
                .filter((e) => e.tipo === "CARGO")
                .map((e) => e.monto)
                .reduce((total, montoActual) => total + montoActual, 0);
            return {
                categoria: nombreCategoria,
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
    OperRegistradas() {
        return this.movimientos.length;
    }
    procesarMovimientos() {
    }
}
