import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Examen } from '../../../models/examen';
import { Asignatura } from '../../../models/asignatura';
import { ExamenService } from '../../../services/examen.service';
import { CommonFormComponent } from '../../common-form.component';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent extends CommonFormComponent<Examen, ExamenService> implements OnInit {

  asignaturasPadre: Asignatura[] = [];
  asignaturasHija: Asignatura[] = [];

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

  override ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(param => param['id'] ? this.service.ver(parseInt(param['id'])) : of(false))
      )
      .subscribe({
        next: modelo => {
          if (modelo !== false) {
            this.miFormulario.reset(modelo);
            this.titulo = `Editar ${this.nombreModel}`;
          }
        },
        error: err => {
          console.log(err);
        }
      });

    this.service.findAllAsignaturas()
      .subscribe(asignaturas => {
        console.log(asignaturas);
        this.asignaturasPadre = asignaturas.filter(a => !a.padre);
      });
  }


}
