import { OnInit, ViewChild, AfterViewInit, Directive } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import Swal from 'sweetalert2';

import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive() //* Con esto se soluciona el problema de: "Class is using Angular features but is not decorated. Please add an explicit Angular decorator"
export abstract class CommonListarComponent<E extends Generic, S extends CommonService<E>> implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected nombreModel: string = '';
  protected titulo: string = '';
  protected lista: E[] = [];

  totalRegistros: number = 0;
  paginaActual: number = 0;
  totalPorPagina: number = 4;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];

  constructor(protected service: S) { }

  ngOnInit(): void {
    this.listarPaginados();
  }

  ngAfterViewInit(): void {
    this.intlLabels();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.listarPaginados();
  }

  eliminar(e: E): void {
    Swal.fire({
      title: `¿Seguro que desea eliminar al ${this.nombreModel} ${e.nombre}?`,
      text: `El ${this.nombreModel} será eliminado de la BD`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(e.id!)
          .subscribe(() => {
            this.listarPaginados();
            Swal.fire(
              'Deleted!',
              `${this.nombreModel} ${e.nombre} eliminado con éxito`,
              'success'
            );
          });
      }
    });
  }

  private listarPaginados(): void {
    this.service.listarPaginas(this.paginaActual, this.totalPorPagina)
      .pipe(
        switchMap(pagination => {
          if (!pagination.first && pagination.last && pagination.content.length === 0) {
            this.paginaActual = 0;
            return this.service.listarPaginas(this.paginaActual, this.totalPorPagina);
          }
          return of(pagination);
        })
      )
      .subscribe(pagination => {
        this.lista = pagination.content;
        this.totalRegistros = pagination.totalElements;
      });
  }

  private intlLabels() {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página'; //* _intl: internacionalización
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.nextPageLabel = 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
  }

}
