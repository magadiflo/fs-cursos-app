import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Alumno } from '../models/alumno';
import { Pagination } from '../interfaces/pagination.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private readonly baseEndPoint: string = 'http://localhost:8090/api/alumnos';
  private cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  listarAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.baseEndPoint);
  }

  listarPaginas(page: number, size: number): Observable<Pagination> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination>(`${this.baseEndPoint}/pagina`, { params });
  }

  verAlumno(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.baseEndPoint}/${id}`);
  }

  crearAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.baseEndPoint}`, alumno, { headers: this.cabeceras });
  }

  editarAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.baseEndPoint}/${alumno.id}`, alumno, { headers: this.cabeceras });
  }

  eliminarAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndPoint}/${id}`);
  }

}
