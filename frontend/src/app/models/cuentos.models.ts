export interface CuentoModelServer {
    id: Number;
    nombre: String;
    categoria: String;
    descripcion: String;
    imagen: String;
}

export interface ServerResponse {
    count: Number;
    cuentos: CuentoModelServer[];
}