var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Cl_dolarApi from "./services/Cl_dolarApi.js";
export default class Cl_mRegistros {
    constructor() {
        this.tasa = new Cl_dolarApi();
        this.movimientos = [];
        this.categorias = [];
        this.movimien = [];
        this.antDlsConversion = 0;
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
            .filter((e) => { var _a, _b; return ((_a = e.categoria) === null || _a === void 0 ? void 0 : _a.toLowerCase().trim()) === ((_b = datMovimientos.categoria) === null || _b === void 0 ? void 0 : _b.toLowerCase().trim()); })
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
    movimientosFechas() {
        let fechas = this.movimien.map;
    }
    categoriasDesgolse(fecha) {
        let datosFiltrados = this.movimientos.filter((e) => e.fecha.includes(fecha));
        const categoriasUnicas = [...new Set(datosFiltrados.map((e) => e.categoria))];
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
    totales(fecha) {
        let datosFiltrados = this.movimientos.filter((e) => e.fecha.includes(fecha));
        const totalIngreso = datosFiltrados
            .filter(e => e.tipo === "ABONO")
            .map(e => e.monto)
            .reduce((total, actual) => total + actual, 0);
        const totalEgresos = datosFiltrados
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
        const registradas = [];
        let numero = 0;
        const datFiltrado = this.movimientos.map((e) => e.categoria);
        for (let i = 0; i < datFiltrado.length; i++) {
            for (let x = 0; x < datFiltrado.length; x++) {
                if (datFiltrado[i] == datFiltrado[x]) {
                    numero = numero + 1;
                }
            }
            if (!registradas.map((e) => e.nombre).includes(datFiltrado[i])) {
                registradas.push({ nombre: datFiltrado[i], cantidadRepet: numero });
            }
            numero = 0;
        }
        for (let i = 0; i < registradas.length; i++) {
            if (this.categorias.includes(registradas[i].nombre)) {
                if (registradas[i].cantidadRepet > 5) {
                    this.categorias.push(registradas[i].nombre.toUpperCase());
                }
            }
        }
    }
    fechasActivas() {
        const fechas = this.movimientos.map((e) => e.fecha);
        let registrosArchivados = [];
        const meses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ];
        let registrosDisponibles = [];
        for (var i = 0; i < fechas.length; i++) {
            let hoy = fechas[i].split("-");
            let registros = `${hoy[0]}-${hoy[1]}`;
            if (!registrosArchivados.includes(registros))
                registrosArchivados.push(registros);
        }
        for (var i = 0; i < registrosArchivados.sort().length; i++) {
            let mes = Number(registrosArchivados[i].slice(5, 7));
            let mesLts = meses[mes - 1];
            registrosDisponibles.push(`${mesLts} ${registrosArchivados[i]}`);
        }
        console.log(registrosDisponibles);
        return registrosDisponibles;
    }
    //ConversionMonto Bs -> $
    conversionMonto(monto) {
        return __awaiter(this, void 0, void 0, function* () {
            const valor = yield this.tasa.obtenerDatos();
            if (monto != this.antDlsConversion) {
                const conversion = monto * Number(valor);
                this.antDlsConversion = conversion;
                return conversion;
            }
        });
    }
}
