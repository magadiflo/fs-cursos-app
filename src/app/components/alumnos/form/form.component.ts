import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { AlumnoService } from '../../../services/alumno.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo: string = 'Crear Alumno';
  error: any;

  miFormulario: FormGroup = this.fb.group({
    id: [null],
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private alumnoService: AlumnoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(param => param['id'] ? this.alumnoService.ver(parseInt(param['id'])) : of(false))
      )
      .subscribe({
        next: alumno => {
          if (alumno !== false) {
            this.miFormulario.reset(alumno);
            this.titulo = 'Editar alumno';
          }
        },
        error: err => {
          console.log(err);
        }
      });
  }

  crear(): void {
    const data = { ...this.miFormulario.value }
    this.alumnoService.crear(data)
      .subscribe({
        next: alumno => {
          console.log(alumno);
          Swal.fire(
            'Nuevo registro',
            `Alumno ${alumno.nombre} creado con éxito`,
            'success'
          );
          this.router.navigate(['/alumnos']);
        },
        error: err => {
          console.log(err);
          if (err.status === 400) {
            this.error = err.error;
          }
        }
      });
  }

  editar(): void {
    const data = { ...this.miFormulario.value }
    this.alumnoService.editar(data)
      .subscribe({
        next: alumno => {
          console.log(alumno);
          Swal.fire(
            'Actualización',
            `Alumno ${alumno.nombre} actualizado con éxito`,
            'success'
          );
          this.router.navigate(['/alumnos']);
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
