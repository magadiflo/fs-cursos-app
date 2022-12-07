import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { AlumnoService } from '../../../services/alumno.service';
import { CommonFormComponent } from '../../common-form.component';
import { Alumno } from '../../../models/alumno';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends CommonFormComponent<Alumno, AlumnoService> implements OnInit {

  private fotoSeleccionada!: File;

  protected override miFormulario: FormGroup = this.fb.group({
    id: [null],
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    service: AlumnoService,
    router: Router,
    activatedRoute: ActivatedRoute) {

    super(service, router, activatedRoute);
    this.nombreModel = Alumno.name;
    this.titulo = `Crear ${this.nombreModel}`;
    this.redirect = '/alumnos';
  }

  seleccionarFoto(event: Event): void {
    this.fotoSeleccionada = (event.target as HTMLInputElement).files![0];
    console.log(this.fotoSeleccionada);
  }

  override crear(): void {
    if (!this.fotoSeleccionada) {
      super.crear();
    } else {
      const data = { ...this.miFormulario.value }
      this.service.crearConFoto(data, this.fotoSeleccionada)
        .subscribe({
          next: alumno => {
            console.log(alumno);
            Swal.fire(
              'Nuevo registro',
              `${this.nombreModel} ${alumno.nombre} creado con éxito`,
              'success'
            );
            this.router.navigate([this.redirect]);
          },
          error: err => {
            console.log(err);
            if (err.status === 400) {
              this.error = err.error;
            }
          }
        });
    }
  }

  override editar(): void {
    if (!this.fotoSeleccionada) {
      super.editar();
    } else {
      const data = { ...this.miFormulario.value }
      this.service.editarConFoto(data, this.fotoSeleccionada)
        .subscribe({
          next: alumno => {
            console.log(alumno);
            Swal.fire(
              'Actualización de registro',
              `${this.nombreModel} ${alumno.nombre} actualizado con éxito`,
              'success'
            );
            this.router.navigate([this.redirect]);
          },
          error: err => {
            console.log(err);
            if (err.status === 400) {
              this.error = err.error;
            }
          }
        });
    }
  }

}
