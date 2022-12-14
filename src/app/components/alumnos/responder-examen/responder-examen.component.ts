import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Alumno } from '../../../models/alumno';
import { Curso } from '../../../models/curso';
import { Examen } from '../../../models/examen';

import { AlumnoService } from '../../../services/alumno.service';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-responder-examen',
  templateUrl: './responder-examen.component.html',
  styleUrls: ['./responder-examen.component.css']
})
export class ResponderExamenComponent implements OnInit {

  alumno!: Alumno;
  curso!: Curso;
  examenes: Examen[] = [];
  mostrarColumnasExamenes: string[] = ['id', 'nombre', 'asignaturas', 'preguntas'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService,
    private cursoService: CursoService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.alumnoService.ver(id))
      )
      .subscribe(alumno => {
        console.log(alumno);
        this.alumno = alumno;

        this.cursoService.obtenerCursoPorAlumnoId(this.alumno)
          .subscribe(curso => {
            console.log(curso);
            this.curso = curso;
            this.examenes = (curso && curso.examenes) ? curso.examenes : [];
          });
      });
  }

}
