import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

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
    this.listarPaginados();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.listarPaginados();
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
            //this.alumnos = this.alumnos.filter(a => a != alumno);
            this.listarPaginados();
            Swal.fire(
              'Deleted!',
              `Alumno ${alumno.nombre} eliminado con éxito`,
              'success'
            );
          });
      }
    });
  }

  private listarPaginados(): void {
    this.alumnoService.listarPaginas(this.paginaActual, this.totalPorPagina)
      .subscribe(pagination => {
        this.alumnos = pagination.content;
        this.totalRegistros = pagination.totalElements;
      });
  }

}
