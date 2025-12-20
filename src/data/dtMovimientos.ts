export const dtCategorias = [
    "Alimentacion",
    "Educacion",
    "Hogar",
    "Vestimenta",
    "Transporte",
    "Salud",
    "Entretenimiento",
    "Servicios",
    "Otros"
];
export const dtMovimientosLibro = [{
    referencia: "REF001",
    descripcion: "compra de Empanadas",
    tipoTransaccion: "Cargo", // Ajustado de 'Abono' a 'Cargo' por ser una compra
    monto: 150.75,
    fecha: "2024-06-15",
    categoria: "Alimentacion",
    status: false
}, {
    referencia: "REF002",
    descripcion: "venta de libros",
    tipoTransaccion: "Abono", // Era 2
    monto: 200.00,
    fecha: "2024-06-16",
    categoria: "Educacion",
    status: false
},
{
    referencia: "REF003",
    descripcion: "compra de utiles escolares",
    tipoTransaccion: "Cargo", // Era 1
    monto: 75.50,
    fecha: "2024-06-17",
    categoria: "Educacion",
    status: false
},
{
    referencia: "REF004",
    descripcion: "venta de muebles usados",
    tipoTransaccion: "Abono", // Era 2
    monto: 300.00,
    fecha: "2024-06-18",
    categoria: "Hogar",
    status: true
},
{
    referencia: "REF005",
    descripcion: "compra de ropa",
    tipoTransaccion: "Cargo", // Era 1
    monto: 120.00,
    fecha: "2024-06-19",
    categoria: "Vestimenta",
    status: false
}]
export const  dtMovimientosBanco  =[{
    referencia: "BAN001",
    descripcion: "deposito en cuenta",
    tipoTransaccion: "CREDITO",
    monto: 1000.00,
    fecha: "2024-06-20",
}, {
    referencia: "BAN002",
    descripcion: "retiro en cajero",
    tipoTransaccion: "DEBITO",
    monto: 200.00,
    fecha: "2024-06-21",
},
{
    referencia: "BAN003",
    descripcion: "transferencia recibida",
    tipoTransaccion: "CREDITO",
    monto: 500.00,
    fecha: "2024-06-22",
},
]