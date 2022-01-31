import { FacturaDetalle } from "./factura-detalle";

export class Factura {
    id: number;
    idCliente: number;
    nroComprobante: string;
    monto: number;
    fecha: Date;
    flgActivo: number;

    listaDetalle: FacturaDetalle[];

    nomCliente: string;
    idUsuarioCrea: number;
    idUsuarioMod: number;
}