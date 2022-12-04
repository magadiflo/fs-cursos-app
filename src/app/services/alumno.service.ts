import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Alumno } from '../models/alumno';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends CommonService<Alumno> {

  protected override baseEndPoint: string = 'http://localhost:8090/api/alumnos';

  constructor(protected override http: HttpClient){
    super(http);
  }

}
