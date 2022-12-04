import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

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

  totalRegistros: number = 0;
  paginaActual: number = 0;
  totalPorPagina: number = 4;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.alumnoService.listarAlumnos()
      .subscribe(alumnos => {
        this.alumnos = alumnos;
      });
  }

  eliminar(alumno: Alumno): void {
    Swal.fire({
      title: `¿Seguro que desea eliminar al alumno ${alumno.nombre}?`,
      text: "El alumno será eliminado de la BD",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService.eliminarAlumno(alumno.id!)
          .subscribe(() => {
            this.alumnos = this.alumnos.filter(a => a != alumno);
            Swal.fire(
              'Deleted!',
              `Alumno ${alumno.nombre} eliminado con éxito`,
              'success'
            );
          });
      }
    });
  }

}
