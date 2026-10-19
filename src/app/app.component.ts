import { Component, signal } from '@angular/core';

import { LlistaVideojocs } from './components/llista-videojocs/llista-videojocs.component'; // Importem el component de llista
import { ELEMENTS_MOCK } from './mocks/dades-mock'; // Importem els 10 videojocs simulats

import { Element } from './models/element.model'; // importem el model per tipar el videojoc seleccionat

import { FiltresVideojocs } from './components/filtres-videojocs/filtres-videojocs.component';
@Component({
  imports: [LlistaVideojocs, FiltresVideojocs], // components disponibles a la plantilla HTML
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  public elements = ELEMENTS_MOCK; // conté els 10 videojocs que enviarem al component fill
  protected readonly title = signal('ioc-angular-catalegvj-joseprc');
  public nomAplicacio = 'Catàleg de videojocs';

  public videojocSeleccionat: Element | null = null; // inicialemnt no hi ha cap videojoc seleccionat

  
  seleccionarVideojoc(videojoc: Element): void {
    this.videojocSeleccionat = videojoc; // Guardem el videojoc seleccionat
  }


}