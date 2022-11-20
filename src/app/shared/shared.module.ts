import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, //* Fundamental para poder trabajar con el routerLink
  ]
})
export class SharedModule { }
