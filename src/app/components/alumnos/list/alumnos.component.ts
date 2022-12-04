import { Component, OnInit } from '@angular/core';

import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno';
import { switchMap } from 'rxjs';

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

  eliminar(alumno: Alumno): void {
    if (confirm(`Seguro que desea eliminar a ${alumno.nombre}`)) {
      this.alumnoService.eliminarAlumno(alumno.id!)
        .subscribe(() => {
          this.alumnos = this.alumnos.filter(a => a != alumno);
          alert(`Alumno ${alumno.nombre} eliminado con éxito`);
        });
    }
  }

}
