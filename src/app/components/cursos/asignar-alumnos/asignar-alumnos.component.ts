import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { CursoService } from '../../../services/curso.service';
import { AlumnoService } from '../../../services/alumno.service';
import { Curso } from '../../../models/curso';
import { Alumno } from '../../../models/alumno';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent implements OnInit {

  curso!: Curso;
  alumnosAsignar: Alumno[] = [];
  mostrarColumnas: string[] = ['nombre', 'apellido', 'seleccion']; //* identificador, definición de los nombres de las columnas. Ejmpl. matColumnDef="nombre"
  seleccion: SelectionModel<Alumno> = new SelectionModel<Alumno>(true, []);

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoService: CursoService,
    private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.cursoService.ver(id))
      )
      .subscribe(curso => this.curso = curso);
  }

  filtrar(event: Event): void {
    const nombre = (event.target as HTMLInputElement).value;
    if (nombre !== null && nombre.trim() !== '') {
      this.alumnoService.filtrarPorNombre(nombre.trim())
        .subscribe(alumnos => this.alumnosAsignar = alumnos.filter(a => {
          let filtrar = true;
          this.curso.cursoAlumnos.forEach(ca => {
            if (a.id === ca.alumnoId) {
              filtrar = false;
            }
          });
          return filtrar;
        }));
    }
  }

  seleccionarDesSeleccionarTodos(): void {
    this.estanTodosSeleccionados() ? this.seleccion.clear() : this.alumnosAsignar.forEach(a => this.seleccion.select(a));
  }

  estanTodosSeleccionados(): boolean {
    return this.seleccion.selected.length === this.alumnosAsignar.length;
  }

  asignar(): void {
    this.cursoService.asignarAlumnos(this.curso, this.seleccion.selected)
      .subscribe(curso => {
        this.curso = curso;
        Swal.fire('Asignados', `Alumnos asignados con éxito al curso ${this.curso.nombre}`, 'success');
        this.alumnosAsignar = [];
        this.seleccion.clear();
      });
  }

}
