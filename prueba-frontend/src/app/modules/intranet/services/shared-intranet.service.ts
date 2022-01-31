import { ClienteService } from "./cliente.service";
import { FacturaService } from "./factura.service";
import { MaestraService } from "./maestra.service";

export const SharedIntranetService = [
    ClienteService,
    MaestraService,
    FacturaService,
];