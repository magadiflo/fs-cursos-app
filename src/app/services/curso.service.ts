import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { CommonService } from './common.service';
import { Curso } from '../models/curso';
import { Alumno } from '../models/alumno';
import { Examen } from '../models/examen';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends CommonService<Curso> {

  protected override baseEndPoint: string = `${environment.BASE_ENDPOINT}/cursos`;

  constructor(http: HttpClient) {
    super(http);
  }

  asignarAlumnos(curso: Curso, alumnos: Alumno[]): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseEndPoint}/${curso.id}/asignar-alumnos`, alumnos, { headers: this.cabeceras });
  }

  eliminarAlumno(curso: Curso, alumno: Alumno): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseEndPoint}/${curso.id}/eliminar-alumno`, alumno, { headers: this.cabeceras });
  }

  asignarExamenes(curso: Curso, examenes: Examen[]): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseEndPoint}/${curso.id}/asignar-examenes`, examenes, { headers: this.cabeceras });
  }

  eliminarExamen(curso: Curso, examen: Examen): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseEndPoint}/${curso.id}/eliminar-examen`, examen, { headers: this.cabeceras });
  }

}