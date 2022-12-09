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

  /**
   * * En los selects del formulario, en el <option></option> utilizo el [ngValue], mientras
   * * que en el proyecto de Selects de Paises del curso de Fernando Herrera
   * * usaba [value], ¿cuál sería la diferencia?
   * * 
   * *    [value] = "..." Sólo admite un string
   * *    [ngValue] = "..." Admite objetos o cualquier tipo, es decir, este último por ejemplo,
   * *                      si defino [ngValue]="true", será un true y no una cadena "true" como 
   * *                      ocurriría con el [value]
   * *
   * * En este formulario en particular, cuando seleccionamos una
   * * asignatura, queremos asignar el objeto completo de Asignatura,
   * * al atributo definido en el FormGroup miFormulario: 
   * * asignaturaPadre, y también para el 
   * * asignaturaHija
   */

  asignaturasPadre: Asignatura[] = [];
  asignaturasHija: Asignatura[] = [];

  protected override miFormulario: FormGroup = this.fb.group({
    id: [null],
    nombre: [null, [Validators.required]],
    asignaturaPadre: [null, [Validators.required]],
    asignaturaHija: [null,],
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
            console.log(modelo);            
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

    //* Cuando cambie la asignatura padre
    this.miFormulario.get('asignaturaPadre')?.valueChanges
      .subscribe((asignatura: Asignatura) => {
        this.asignaturasHija = asignatura.hijos;
      });
  }


}
