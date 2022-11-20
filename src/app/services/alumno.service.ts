import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private readonly baseEndPoint: string = 'http://localhost:8090/api/alumnos';

  constructor(private http: HttpClient) { }

}
