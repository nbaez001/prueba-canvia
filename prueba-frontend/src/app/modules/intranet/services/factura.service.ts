import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacturaBuscar } from '../dto/request/factura-buscar';
import { Factura } from '../dto/response/factura';
import { OutResponse } from '../dto/response/out.response';

@Injectable()
export class FacturaService {

  constructor(private http: HttpClient) { }

  public registrarFactura(req: Factura): Observable<OutResponse<Factura>> {
    return this.http.post<OutResponse<Factura>>(`${environment.pruebaBackendUrl}/factura/registrarFactura`, req);
  }

  public modificarFactura(req: Factura): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.pruebaBackendUrl}/factura/modificarFactura`, req);
  }

  public listarFactura(req: Factura): Observable<OutResponse<Factura[]>> {
    return this.http.post<OutResponse<Factura[]>>(`${environment.pruebaBackendUrl}/factura/listarFactura`, req);
  }

  public eliminarFacturaLogica(req: Factura): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.pruebaBackendUrl}/factura/eliminarFacturaLogica`, req);
  }

  public listarFacturaPaginado(req: FacturaBuscar): Observable<OutResponse<Factura[]>> {
    return this.http.post<OutResponse<Factura[]>>(`${environment.pruebaBackendUrl}/factura/listarFacturaPaginado`, req);
  }

  public buscarFactura(req: Factura): Observable<OutResponse<Factura>> {
    return this.http.post<OutResponse<Factura>>(`${environment.pruebaBackendUrl}/factura/buscarFactura`, req);
  }
}
