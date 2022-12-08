import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Examen } from '../../../models/examen';
import { ExamenService } from '../../../services/examen.service';
import { CommonFormComponent } from '../../common-form.component';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent extends CommonFormComponent<Examen, ExamenService> {

  protected override miFormulario: FormGroup = this.fb.group({
    id: [null],
    nombre: [null, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    service: ExamenService,
    router: Router,
    activatedRoute: ActivatedRoute) {
    super(service, router, activatedRoute);
    this.nombreModel = Examen.name;
    this.titulo = `Crear ${this.nombreModel}`;
    this.redirect = '/examenes';
  }


}
