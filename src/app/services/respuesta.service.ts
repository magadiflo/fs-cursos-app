import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Respuesta } from '../models/respuesta';
import { Examen } from '../models/examen';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private baseEndPoint: string = `${environment.BASE_ENDPOINT}/respuestas`;

  constructor(private http: HttpClient) { }

  crear(respuestas: Respuesta[]): Observable<Respuesta[]> {
    return this.http.post<Respuesta[]>(`${this.baseEndPoint}`, respuestas, { headers: this.cabeceras });
  }

  obtenerRespuestasPorAlumnoYExamen(alumno: Alumno, examen: Examen): Observable<Respuesta[]> {
    return this.http.get<Respuesta[]>(`${this.baseEndPoint}/alumno/${alumno.id}/examen/${examen.id}`);
  }

}
