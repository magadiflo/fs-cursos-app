import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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

  /*** 
   * * ************* DIFERENCIA ENTRE [value] Y [ngValue] *************
   * * *****************************************************************
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

  /**
   * * * ************* USO DEL [compareWith] en los selects *************
   * * *****************************************************************
   * * Para personalizar el algoritmo de comparación de opciones predeterminado, <select> admite 
   * * la entrada compareWith. compareWith toma una función que tiene dos argumentos: opción1 y opción2. 
   * * Si se proporciona compareWith, Angular selecciona la opción por el valor de retorno de la función.
   * * 
   * * En resumen, como en los selects estamos obteniendo el objeto completo, al entrar para poder editar
   * * un examen, vemos que los selects no se seleccionan con el valor guardado en la BD, es decir, nos 
   * * muestra en blanco. Para eso, es que establecemos el compareWith, para personalizar nuestra propia 
   * * comparación ya que la comparación que hace por defecto Angular no muestra los valores recuperados.
   */

  asignaturasPadre: Asignatura[] = [];
  asignaturasHija: Asignatura[] = [];

  protected override miFormulario: FormGroup = this.fb.group({
    id: [null],
    nombre: [null, [Validators.required]],
    asignaturaPadre: [null, [Validators.required]],
    asignaturaHija: [null, [Validators.required]],
    preguntas: this.fb.array([]),
  });

  get preguntasArray(): FormArray {
    return this.miFormulario.get('preguntas') as FormArray;
  }

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
        next: (modelo: Examen | boolean) => {
          if (modelo !== false) {
            const examen = modelo as Examen;
            this.miFormulario.reset(examen);
            this.titulo = `Editar ${this.nombreModel}`;
            this.asignaturasPadre = [examen.asignaturaPadre!];
            examen.preguntas.forEach(e => {
              this.preguntasArray.push(this.crearPregunta(e.id!, e.texto));
            });
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

  compararAsignatura(a1: Asignatura, a2: Asignatura): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }

  agregarPregunta(): void {
    this.preguntasArray.push(this.crearPregunta());
  }

  //* Como se ve, este método devuelve un FormGroup y como este método
  //* será usado para agregarse dentro de un FormArray, el nombre que tendrá 
  //* este FormGroup es el índice en el FormArray, precisamente ese índice
  //* se usará en la plantilla html: [formGroupName]="i" (i=índice)
  private crearPregunta(id: number | null = null, texto: string | null = null): FormGroup {
    return this.fb.group({
      id: [id],
      texto: [texto, [Validators.required]]
    });
  }

}