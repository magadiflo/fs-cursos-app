import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';


import { AlumnosComponent } from './components/alumnos/list/alumnos.component';
import { CursosComponent } from './components/cursos/list/cursos.component';
import { ExamenesComponent } from './components/examenes/list/examenes.component';
import { FormComponent } from './components/alumnos/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    CursosComponent,
    ExamenesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
