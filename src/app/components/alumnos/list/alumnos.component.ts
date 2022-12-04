import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno';
import { CommonListarComponent } from '../../common-listar.component';

/**
 * * El implements del OnInit y el AfterViewInit, lo podemos dejar aquí, no hay problema, ya
 * * que finalmente se está implementando en el CommonListarComponent
 */

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent extends CommonListarComponent<Alumno, AlumnoService> implements OnInit, AfterViewInit {

  constructor(service: AlumnoService) {
    super(service);
    this.titulo = 'Listar alumnos';
    this.nombreModel = Alumno.name; //* Se obtiene el nombre de la Clase
  }

}
