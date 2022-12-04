import { Directive, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';
import { Generic } from '../models/generic';
import { FormGroup } from '@angular/forms';

/**
 * * ***** ¿Qué significa tener un decorador @Directive() sin metadatos dentro de él?
 * * *********************************************************************************
 * * La presencia del decorador @Directive hace que Angular genere 
 * * código adicional para la clase afectada. Si ese decorador no incluye 
 * * propiedades (metadatos), la directiva no se comparará con los elementos 
 * * ni se instanciará directamente, pero otras clases que amplían la clase directiva 
 * * heredarán este código generado. Puede pensar en esto como una directiva "abstracta".
 * 
 * * ¿Cuándo necesito un decorador @Directive() sin selector?
 * * *********************************************************
 * * Si usa inyección de dependencia o cualquier característica específica de Angular, 
 * * como @HostBinding(), @ViewChild() o @Input(), necesita un decorador @Directive() o @Component(). 
 * * El decorador le permite al compilador saber que debe generar las instrucciones correctas para 
 * * crear esa clase y cualquier clase que la amplíe. Si no desea usar esa clase base como directiva 
 * * directamente, deje el selector en blanco. Si desea que se pueda usar de forma independiente, 
 * * complete los metadatos como de costumbre.
 * * Las clases que no usan funciones de Angular no necesitan un decorador de Angular.
 * *
 * * Fuente:
 * * https://angular.io/guide/migration-undecorated-classes
 */

@Directive() //* Con esto se soluciona el problema de: "Class is using Angular features but is not decorated. Please add an explicit Angular decorator"
export abstract class CommonFormComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  protected error: any;
  protected miFormulario!: FormGroup;

  protected nombreModel: string = '';
  protected titulo: string = '';
  protected redirect: string = '';

  constructor(
    protected service: S,
    protected router: Router,
    protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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
  }

  crear(): void {
    const data = { ...this.miFormulario.value }
    this.service.crear(data)
      .subscribe({
        next: modelo => {
          console.log(modelo);
          Swal.fire(
            'Nuevo registro',
            `${this.nombreModel} ${modelo.nombre} creado con éxito`,
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

  editar(): void {
    const data = { ...this.miFormulario.value }
    this.service.editar(data)
      .subscribe({
        next: modelo => {
          console.log(modelo);
          Swal.fire(
            'Actualización',
            `${this.nombreModel} ${modelo.nombre} actualizado con éxito`,
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
