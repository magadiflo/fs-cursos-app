import { Pipe, PipeTransform } from '@angular/core';

import { Alumno } from '../models/alumno';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(alumno: Alumno): string {
    console.log('actualizando imagen...');
    return alumno.fotoHashCode ? `http://localhost:8090/api/alumnos/uploads/img/${alumno.id}` : 'assets/img-default.png';
  }

}
