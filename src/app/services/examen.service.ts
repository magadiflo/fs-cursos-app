import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Examen } from '../models/examen';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen> {

  protected override baseEndPoint: string = `${environment.BASE_ENDPOINT}/examenes`;

  constructor(http: HttpClient) {
    super(http);
  }

}