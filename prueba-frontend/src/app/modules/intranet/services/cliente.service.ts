import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteBuscar } from '../dto/request/cliente-buscar';
import { Cliente } from '../dto/response/cliente';
import { OutResponse } from '../dto/response/out.response';

@Injectable()
export class ClienteService {

  constructor(private http: HttpClient) { }

  public registrarCliente(req: Cliente): Observable<OutResponse<Cliente>> {
    return this.http.post<OutResponse<Cliente>>(`${environment.pruebaBackendUrl}/cliente/registrarCliente`, req);
  }

  public modificarCliente(req: Cliente): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.pruebaBackendUrl}/cliente/modificarCliente`, req);
  }

  public listarCliente(req: Cliente): Observable<OutResponse<Cliente[]>> {
    return this.http.post<OutResponse<Cliente[]>>(`${environment.pruebaBackendUrl}/cliente/listarCliente`, req);
  }

  public eliminarClienteLogica(req: Cliente): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.pruebaBackendUrl}/cliente/eliminarClienteLogica`, req);
  }

  public listarClientePaginado(req: ClienteBuscar): Observable<OutResponse<Cliente[]>> {
    return this.http.post<OutResponse<Cliente[]>>(`${environment.pruebaBackendUrl}/cliente/listarClientePaginado`, req);
  }
}
