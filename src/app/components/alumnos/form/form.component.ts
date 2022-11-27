import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private alumnoService: AlumnoService,
    private router: Router) { }

  ngOnInit(): void {
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

}
