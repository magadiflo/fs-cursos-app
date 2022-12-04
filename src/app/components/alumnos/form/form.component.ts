import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AlumnoService } from '../../../services/alumno.service';
import { CommonFormComponent } from '../../common-form.component';
import { Alumno } from '../../../models/alumno';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends CommonFormComponent<Alumno, AlumnoService> implements OnInit {

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

}
