import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "../../environments/environment";

import { Alumno } from '../models/alumno';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends CommonService<Alumno> {

  protected override baseEndPoint: string = `${environment.BASE_ENDPOINT}/alumnos`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  crearConFoto(alumno: Alumno, archivo: File): Observable<Alumno> {
    const formData = new FormData(); //* FormData, es una clase de JavaScript

    //* Estos valores por defecto se poblarán en el objeto Alumno 
    //* definido como parámetro en el método del backend
    //* crearConFoto(@Valid Alumno alumno.....
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);

    //* Este valor será colocado al parámetro MultipartFile archivo
    //* ....@RequestParam MultipartFile archivo) throws IOException {
    formData.append('archivo', archivo);

    return this.http.post<Alumno>(`${this.baseEndPoint}/crear-con-foto`, formData);
  }

  editarConFoto(alumno: Alumno, archivo: File): Observable<Alumno> {
    const formData = new FormData();

    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);
    formData.append('archivo', archivo);

    return this.http.put<Alumno>(`${this.baseEndPoint}/editar-con-foto/${alumno.id}`, formData);
  }

}
