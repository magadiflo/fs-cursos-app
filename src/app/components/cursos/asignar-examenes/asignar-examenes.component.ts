import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
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

}