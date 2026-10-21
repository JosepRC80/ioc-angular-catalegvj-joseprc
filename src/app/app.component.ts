import { Component, signal } from '@angular/core';

import { LlistaVideojocs } from './components/llista-videojocs/llista-videojocs.component'; // Importem el component de llista
import { ELEMENTS_MOCK } from './mocks/dades-mock'; // Importem els 10 videojocs simulats

import { Element } from './models/element.model'; // importem el model per tipar el videojoc seleccionat

import { FiltresVideojocs, type CriterisFiltre } from './components/filtres-videojocs/filtres-videojocs.component'; // component i tipus dels filtres

@Component({
  imports: [LlistaVideojocs, FiltresVideojocs], // components disponibles a la plantilla HTML
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  public elements = ELEMENTS_MOCK; // conté els 10 videojocs que enviarem al component fill
  public elementsFiltrats: Element[] = [...ELEMENTS_MOCK]; // llista de jocs que mostrarem després d'aplicar els filtres. **[...ELEMENTS_MOK] crea un nou array amb els mateixos videojocs que tenim a ELEMENTS_MOCK**
  protected readonly title = signal('ioc-angular-catalegvj-joseprc');
  public nomAplicacio = 'Catàleg de videojocs';

  public videojocSeleccionat: Element | null = null; // inicialemnt no hi ha cap videojoc seleccionat

  
  seleccionarVideojoc(videojoc: Element): void {
    this.videojocSeleccionat = videojoc; // Guardem el videojoc seleccionat
  }

  // rep els criteris enviats pel component FiltresVideojocs
  rebreFiltres(criteris: CriterisFiltre): void {
    
    // preparem el text per comparar-lo sense distinguir majúscules i minúscules
    const text = criteris.text.trim().toLowerCase();

    // recorrem la llista original i conservem els jocs que compleixen les condicions
    this.elementsFiltrats = this.elements.filter(videojoc => {

      // comprovem si el títol conté el text cercat
      const coincideixText = videojoc.titol.toLowerCase().includes(text);

      // comprovem la categoria i si és buida acceptem totes les categories
      const coincideixCategoria = criteris.categoria === '' || videojoc.categoria === criteris.categoria;

      // el joc ha de complir totes dues condicions
      return coincideixText && coincideixCategoria;
    });
  }


}