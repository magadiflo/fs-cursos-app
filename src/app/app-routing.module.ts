import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlumnosComponent } from './components/alumnos/list/alumnos.component';
import { FormComponent as AlumnosForm } from './components/alumnos/form/form.component';
import { CursosComponent } from './components/cursos/list/cursos.component';
import { ExamenesComponent } from './components/examenes/list/examenes.component';

const routes: Routes = [
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },
  { path: 'alumnos', component: AlumnosComponent, },
  { path: 'alumnos/form', component: AlumnosForm, },
  { path: 'alumnos/form/:id', component: AlumnosForm, },
  { path: 'cursos', component: CursosComponent, },
  { path: 'examenes', component: ExamenesComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
