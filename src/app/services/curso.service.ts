import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Curso } from '../models/curso';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends CommonService<Curso> {

  protected override baseEndPoint: string = `${environment.BASE_ENDPOINT}/cursos`;

  constructor(http: HttpClient) {
    super(http);
  }

}