import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
        switchMap(param => param['id'] ? this.alumnoService.verAlumno(parseInt(param['id'])) : of(false))
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
    this.alumnoService.crearAlumno(data)
      .subscribe({
        next: alumno => {
          console.log(alumno);
          alert(`Alumno ${alumno.nombre} creado con éxito`);
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
    this.alumnoService.editarAlumno(data)
      .subscribe({
        next: alumno => {
          console.log(alumno);
          alert(`Alumno ${alumno.nombre} actualizado con éxito`);
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
