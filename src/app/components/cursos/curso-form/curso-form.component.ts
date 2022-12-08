import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Curso } from '../../../models/curso';
import { CommonFormComponent } from '../../common-form.component';
import { CursoService } from '../../../services/curso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent extends CommonFormComponent<Curso, CursoService> {

  protected override miFormulario: FormGroup = this.fb.group({
    id: [null],
    nombre: [null, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    service: CursoService,
    router: Router,
    activatedRoute: ActivatedRoute) {
    super(service, router, activatedRoute);
    this.nombreModel = Curso.name;
    this.titulo = `Crear ${this.nombreModel}`;
    this.redirect = '/cursos';
  }

}
