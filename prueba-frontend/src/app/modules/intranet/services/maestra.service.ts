import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaestraBuscar } from '../dto/request/maestra-buscar';
import { Maestra } from '../dto/response/maestra';
import { OutResponse } from '../dto/response/out.response';

@Injectable()
export class MaestraService {

  constructor(private http: HttpClient) { }

  public listarMaestra(req: MaestraBuscar): Observable<OutResponse<Maestra[]>> {
    return this.http.post<OutResponse<Maestra[]>>(`${environment.pruebaBackendUrl}/maestra/listarMaestra`, req);
  }
}
