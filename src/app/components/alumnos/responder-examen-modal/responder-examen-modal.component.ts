import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Curso } from '../../../models/curso';
import { Alumno } from '../../../models/alumno';
import { Examen } from '../../../models/examen';

@Component({
  selector: 'app-responder-examen-modal',
  templateUrl: './responder-examen-modal.component.html',
  styleUrls: ['./responder-examen-modal.component.css']
})
export class ResponderExamenModalComponent implements OnInit {

  curso!: Curso;
  alumno!: Alumno;
  examen!: Examen;
  respuestas = ['Alguna respuesta'];

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

}
