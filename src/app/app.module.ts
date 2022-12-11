import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { ImagenPipe } from './pipes/imagen.pipe';

import { AlumnosComponent } from './components/alumnos/list/alumnos.component';
import { CursosComponent } from './components/cursos/list/cursos.component';
import { ExamenesComponent } from './components/examenes/list/examenes.component';
import { FormComponent } from './components/alumnos/form/form.component';
import { CursoFormComponent } from './components/cursos/curso-form/curso-form.component';
import { ExamenFormComponent } from './components/examenes/examen-form/examen-form.component';
import { AsignarAlumnosComponent } from './components/cursos/asignar-alumnos/asignar-alumnos.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    CursosComponent,
    ExamenesComponent,
    FormComponent,
    ImagenPipe,
    CursoFormComponent,
    ExamenFormComponent,
    AsignarAlumnosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
