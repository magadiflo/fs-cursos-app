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

  /**
   * * Recordemos que en la clase CommonService tenemos definido
   * * en el constructor el atributo http con su modificador del 
   * * tipo protected, de esta manera:
   * *      constructor(protected http: HttpClient) { }
   * * es decir, es como si se declarara de esta manera:
   * *    protected http: HttpClient;
   * *    constructor(http: HttpClient) {
   * *      this.http = http;
   * *    }
   * * Entonces, ya habiendo recordado lo que significa colocar el modificador
   * * dentro del costructor podemos ver que esta clase (AlumnoService) está
   * * heredando de CommonService, por lo tanto aquí ya no usamos el modificador
   * * protected dentro del constructor, sino más bien solo lo definimos como un parámetro,
   * * el cual será inyectado por Angular, y ese valor se lo pasamos con super(...)
   * * al constructor padre (CommonService), de tal manera que cuando querramos hacer
   * * uso del atributo http, lo podremos hacer sin ningún problema ya que dicho 
   * * atributo está definido en la clase padre y desde esta clase lo podremos usar
   * * sin ningún problema, referenciándolo con el this:
   * *    this.http
   * * Podemos ver un ejemplo en el método editarConFoto(...) y crearConFoto(...), 
   * * internamente hacemos uso del this.http.put o this.http.post que es el atributo 
   * * de la clase padre que la estamos reutilizando en esta clase por el principio de
   * * herencia
   * * 
   * 
   */
  constructor(http: HttpClient) {
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
