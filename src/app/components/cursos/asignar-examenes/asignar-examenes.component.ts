import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

import { Curso } from '../../../models/curso';
import { Examen } from '../../../models/examen';

import { CursoService } from '../../../services/curso.service';
import { ExamenService } from '../../../services/examen.service';

@Component({
  selector: 'app-asignar-examenes',
  templateUrl: './asignar-examenes.component.html',
  styleUrls: ['./asignar-examenes.component.css']
})
export class AsignarExamenesComponent implements OnInit {

  curso!: Curso;
  autocompleteControl = new FormControl();
  examenesFiltrados: Examen[] = [];
  examenesAsignar: Examen[] = [];
  mostrarColumnas: string[] = ['nombre', 'asignatura', 'eliminar'];
  mostrarTodasColumnasExamenes: string[] = ['id', 'nombre', 'asignaturas', 'eliminar'];
  examenes: Examen[] = [];
  tabIndex: number = 0;
  pageSizeOptions: number[] = [3, 5, 10, 20, 50];
  dataSource!: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private cursoService: CursoService,
    private examenService: ExamenService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.cursoService.ver(id))
      )
      .subscribe(curso => {
        console.log(curso);
        this.curso = curso;
        this.examenes = curso.examenes;
        this.initPaginador();
      });

    this.autocompleteControl.valueChanges
      .pipe(
        map(valor => typeof valor === 'string' ? valor : valor.nombre),
        switchMap(valor => valor ? this.examenService.filtrarPorNombre(valor) : [])
      )
      .subscribe(examenes => this.examenesFiltrados = examenes);
  }

  private initPaginador() {
    this.dataSource = new MatTableDataSource<Examen>(this.examenes);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
  }

  private existe(id: number): boolean {
    return this.examenesAsignar.concat(this.curso.examenes).map(exam => exam.id).indexOf(id) !== -1;
  }

  mostrarNombre(examen?: Examen): string {
    return examen ? examen.nombre : '';
  }

  seleccionarExamen(event: MatAutocompleteSelectedEvent): void {
    const examen = event.option.value as Examen;

    if (!this.existe(examen.id!)) {
      //* concat(...), devuelve un nuevo arreglo con los datos existentes más el que agregamos.
      //* No usamos el push(...), porque el mat-table no detecta el cambio, pero si creamos
      //* un arreglo nuevo a partir del existente más el nuevo elemento, allí sí lo detecta.
      this.examenesAsignar = this.examenesAsignar.concat(examen);
    } else {
      Swal.fire('¡Atención!', `El examen <b>${examen.nombre}</b> ya ha sido seleccionado o asignado al curso`, 'warning');
    }

    this.autocompleteControl.setValue('');
    event.option.deselect();
    event.option.focus();
  }

  eliminarDelAsignar(examen: Examen): void {
    this.examenesAsignar = this.examenesAsignar.filter(e => e.id !== examen.id);
  }

  asignar(): void {
    this.cursoService.asignarExamenes(this.curso, this.examenesAsignar)
      .subscribe(curso => {
        this.curso = curso;
        this.examenes = this.curso.examenes;
        this.examenesAsignar = [];
        Swal.fire('Asignados', `Exámenes asignados con éxito al curso <b>${curso.nombre}</b>`, 'success');
        this.tabIndex = 2;
        this.initPaginador();
      });
  }

  eliminarExamenDelCurso(examen: Examen): void {
    Swal.fire({
      title: `Eliminar examen del curso ${this.curso.nombre}`,
      text: `¿Seguro que desea que el examen ${examen.nombre} ya no esté asignado al curso?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoService.eliminarExamen(this.curso, examen)
          .subscribe(curso => {
            this.curso = curso;
            this.examenes = this.examenes.filter(exam => exam.id !== examen.id);
            this.initPaginador();
            Swal.fire('Eliminado', `El examen ${examen.nombre} fue eliminado del curso ${curso.nombre}`, 'success');
            console.log(curso);
          });
      }
    });

  }
}
