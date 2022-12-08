import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

import { Alumno } from '../models/alumno';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(alumno: Alumno): string {
    return alumno.fotoHashCode ? `${environment.BASE_ENDPOINT}/alumnos/uploads/img/${alumno.id}` : './assets/images/img-default.png';
  }

}
