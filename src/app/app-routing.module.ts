import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlumnosComponent } from './components/alumnos/list/alumnos.component';
import { FormComponent as AlumnosForm } from './components/alumnos/form/form.component';
import { CursosComponent } from './components/cursos/list/cursos.component';
import { ExamenesComponent } from './components/examenes/list/examenes.component';
import { CursoFormComponent } from './components/cursos/curso-form/curso-form.component';
import { ExamenFormComponent } from './components/examenes/examen-form/examen-form.component';
import { AsignarAlumnosComponent } from './components/cursos/asignar-alumnos/asignar-alumnos.component';
import { AsignarExamenesComponent } from './components/cursos/asignar-examenes/asignar-examenes.component';

const routes: Routes = [
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },
  { path: 'alumnos', component: AlumnosComponent, },
  { path: 'alumnos/form', component: AlumnosForm, },
  { path: 'alumnos/form/:id', component: AlumnosForm, },
  { path: 'cursos', component: CursosComponent, },
  { path: 'cursos/form', component: CursoFormComponent, },
  { path: 'cursos/asignar-alumnos/:id', component: AsignarAlumnosComponent, },
  { path: 'cursos/asignar-examenes/:id', component: AsignarExamenesComponent, },
  { path: 'cursos/form/:id', component: CursoFormComponent, },
  { path: 'examenes', component: ExamenesComponent, },
  { path: 'examenes/form', component: ExamenFormComponent, },
  { path: 'examenes/form/:id', component: ExamenFormComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
