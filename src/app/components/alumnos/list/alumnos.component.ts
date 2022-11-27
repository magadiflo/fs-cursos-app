import { Component, OnInit } from '@angular/core';

import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  titulo: string = 'Listado de Alumnos';
  alumnos: Alumno[] = [];

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.alumnoService.listarAlumnos()
      .subscribe(alumnos => {
        console.log(alumnos);
        this.alumnos = alumnos;
      });
  }

}
