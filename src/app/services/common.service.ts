import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pagination } from '../interfaces/pagination.interfaces';
import { Generic } from '../models/generic';

//* E, de Entity. Puede ser cualquier letra, ejm. M, de Modelo, etc
export abstract class CommonService<E extends Generic> {

  protected baseEndPoint!: string;
  protected cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected http: HttpClient) { }

  listar(): Observable<E[]> {
    return this.http.get<E[]>(this.baseEndPoint);
  }

  listarPaginas(page: number, size: number): Observable<Pagination<E>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination<E>>(`${this.baseEndPoint}/pagina`, { params });
  }

  ver(id: number): Observable<E> {
    return this.http.get<E>(`${this.baseEndPoint}/${id}`);
  }

  crear(e: E): Observable<E> {
    return this.http.post<E>(`${this.baseEndPoint}`, e, { headers: this.cabeceras });
  }

  editar(e: E): Observable<E> {
    //* Como E extends de Generic, y en Generic tenemos un id, entonces es por eso que aquí 
    //* el e.id ya no marca error, lo acepta
    return this.http.put<E>(`${this.baseEndPoint}/${e.id}`, e, { headers: this.cabeceras });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndPoint}/${id}`);
  }

}
