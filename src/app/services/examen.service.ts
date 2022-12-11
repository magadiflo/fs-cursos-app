import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Examen } from '../models/examen';
import { CommonService } from './common.service';
import { Asignatura } from '../models/asignatura';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen> {

  protected override baseEndPoint: string = `${environment.BASE_ENDPOINT}/examenes`;

  constructor(http: HttpClient) {
    super(http);
  }

  findAllAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.baseEndPoint}/asignaturas`);
  }

  filtrarPorNombre(nombre: string): Observable<Examen[]> {
    return this.http.get<Examen[]>(`${this.baseEndPoint}/filtrar/${nombre}`);
  }

}