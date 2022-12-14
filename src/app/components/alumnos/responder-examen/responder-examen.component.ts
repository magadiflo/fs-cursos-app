import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Alumno } from '../../../models/alumno';
import { Curso } from '../../../models/curso';
import { Examen } from '../../../models/examen';
import { Respuesta } from '../../../models/respuesta';

import { AlumnoService } from '../../../services/alumno.service';
import { CursoService } from '../../../services/curso.service';
import { RespuestaService } from '../../../services/respuesta.service';

import { ResponderExamenModalComponent } from '../responder-examen-modal/responder-examen-modal.component';
import { VerExamenModalComponent } from '../ver-examen-modal/ver-examen-modal.component';

@Component({
  selector: 'app-responder-examen',
  templateUrl: './responder-examen.component.html',
  styleUrls: ['./responder-examen.component.css']
})
export class ResponderExamenComponent implements OnInit {

  alumno!: Alumno;
  curso!: Curso;
  examenes: Examen[] = [];
  mostrarColumnasExamenes: string[] = ['id', 'nombre', 'asignaturas', 'preguntas', 'responder', 'ver'];
  datasource!: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  pageSizeOptions: number[] = [3, 5, 10, 20, 30, 50];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private respuestaService: RespuestaService,
    public dialog: MatDialog) { }

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

            this.datasource = new MatTableDataSource<Examen>(this.examenes);
            this.datasource.paginator = this.paginator;
            this.paginator._intl.itemsPerPageLabel = 'Registros por página';
          });
      });
  }

  responderExamen(examen: Examen): void {
    //* Esta variable modalRef, que es una referencia de nuestro modal, 
    //* se pasa de forma automática a nuestro componente modal. Esa referencia
    //* será inyectada en el modal para poder recibirla.
    const modalRef = this.dialog.open(ResponderExamenModalComponent, {
      width: '750px', data: { curso: this.curso, alumno: this.alumno, examen }
    });

    modalRef.afterClosed()
      .subscribe((respuestasMap: Map<number, Respuesta>) => {
        console.log('Modal responder examen ha sido enviado y cerrado', respuestasMap);
        if (respuestasMap) {
          //* El método Array.from(), crea una nueva instancia de Array a partir de un objeto iterable
          const respuestas: Respuesta[] = Array.from(respuestasMap.values()); //* De esa manera convertimos los valores del mapa en un arreglo, es decir obtendremos un arreglo de respuestas
          console.log('respuestas', respuestas);
          this.respuestaService.crear(respuestas)
            .subscribe(resp => {
              console.log('Respuestas guardadas', resp);
              examen.respondido = true;
              Swal.fire('Enviadas', 'Preguntas enviadas con éxito', 'success');
            });
        }
      });
  }

  verExamen(examen: Examen): void {
    this.respuestaService.obtenerRespuestasPorAlumnoYExamen(this.alumno, examen)
      .subscribe(resp => {
        console.log(`Obtener respuestas por alumno y examen`, examen, resp);        
        const modalRef = this.dialog.open(VerExamenModalComponent, {
          width: '750px',
          data: { curso: this.curso, examen, respuestas: resp }
        });

        modalRef.afterClosed()
          .subscribe(() => {
            console.log('Modal ver examen cerrado!');
          });
      });
  }

}
