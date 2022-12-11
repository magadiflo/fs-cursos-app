import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs';

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
  mostrarColumnas: string[] = ['nombre', 'asignatura'];

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
      .subscribe(curso => console.log(curso));

    this.autocompleteControl.valueChanges
      .pipe(
        map(valor => typeof valor === 'string' ? valor : valor.nombre),
        switchMap(valor => valor ? this.examenService.filtrarPorNombre(valor) : [])
      )
      .subscribe(examenes => this.examenesFiltrados = examenes);
  }

  mostrarNombre(examen?: Examen): string {
    return examen ? examen.nombre : '';
  }

  seleccionarExamen(event: MatAutocompleteSelectedEvent): void {
    const examen = event.option.value as Examen;

    //* concat(...), devuelve un nuevo arreglo con los datos existentes más el que agregamos.
    //* No usamos el push(...), porque el mat-table no detecta el cambio, pero si creamos
    //* un arreglo nuevo a partir del existente más el nuevo elemento, allí sí lo detecta.
    this.examenesAsignar = this.examenesAsignar.concat(examen);

    this.autocompleteControl.setValue('');
    event.option.deselect();
    event.option.focus();
  }

}
