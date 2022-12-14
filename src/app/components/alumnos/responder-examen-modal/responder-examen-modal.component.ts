import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Curso } from '../../../models/curso';
import { Alumno } from '../../../models/alumno';
import { Examen } from '../../../models/examen';
import { Respuesta } from '../../../models/respuesta';
import { Pregunta } from '../../../models/pregunta';

@Component({
  selector: 'app-responder-examen-modal',
  templateUrl: './responder-examen-modal.component.html',
  styleUrls: ['./responder-examen-modal.component.css']
})
export class ResponderExamenModalComponent implements OnInit {

  curso!: Curso;
  alumno!: Alumno;
  examen!: Examen;
  respuestas: Map<number, Respuesta> = new Map<number, Respuesta>();

  /**
   * * @Inject(MAT_DIALOG_DATA), con esto se inyectan los datos que se pasan a este componente desde el método
   * * responderExamen(...) del componente responder-examen.component.ts cuando se abre la ventana.
   * 
   * @param */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<ResponderExamenModalComponent>) { }

  ngOnInit(): void {
    this.curso = this.data.curso as Curso;
    this.alumno = this.data.alumno as Alumno;
    this.examen = this.data.examen as Examen;
  }

  cancelar(): void {
    this.modalRef.close();
  }

  responder(pregunta: Pregunta, event: Event): void {
    const texto = (event.target as HTMLInputElement).value;
    const respuesta = new Respuesta();
    respuesta.alumno = this.alumno;
    respuesta.pregunta = pregunta;
    respuesta.texto = texto;

    this.respuestas.set(pregunta.id!, respuesta);
    console.log(this.respuestas);
  }

}
