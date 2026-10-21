
/**
 * Component de filtres de videojocs.
 *
 * Aquest component permetrà introduir criteris
 * de cerca i filtratge del catàleg.
 *
 * El formulari i les validacions es desenvoluparan
 * durant l'Exercici 3 de l'EAC2.
 */

import { Component, EventEmitter, Output } from '@angular/core'; // Importem el decorador Component d'Angular
import { FormsModule } from '@angular/forms'; // Permet utilitzar ngModel als formularis


/** Defineix les dades que enviarem al component pare quan l'usuari apliqui els filtres de cerca */
export interface CriterisFiltre {
  text: string; // el text que volem cercar
  categoria: string; // la categoria que volem seleccionar
}
@Component({
  imports: [FormsModule], // posem les eines, directives, components i funcionalitats que volem tenir disponibles a la plantilla HTML d'aquell component
  selector: 'app-filtres-videojocs', // Etiqueta HTML del component
  styleUrl: './filtres-videojocs.component.scss', // Fitxer d'estils SCSS
  templateUrl: './filtres-videojocs.component.html', // Plantilla HTML
})

export class FiltresVideojocs {
  
  @Output() aplicarFiltres = new EventEmitter<CriterisFiltre>(); // envia els criteris de filtratge al component pare

  textCerca: string = ''; //Guarda el text introduït al camp de cerca
  categoriaSeleccionada: string = ''; // Guarda la categoria seleccionada

  /** envia els criteris de filtratge al component pare */
  enviarFiltres(): void {

    // creem una constant que contrindrà un objecte amb els valors actuals del formulari
    const criteris: CriterisFiltre = {
      text: this.textCerca,
      categoria: this.categoriaSeleccionada
    };

    // comprovo quines dades estic a punt d'enviar
    console.log('Filtres enviats:', criteris);

    // Emetem l'objecte perquè el component pare el pugui rebre
    this.aplicarFiltres.emit(criteris);
  }

  // botó per restablir tots els filtres
  restablirFiltres(): void {
    this.textCerca = '';  // buidem el camp cerca
    this.categoriaSeleccionada = ''; // tormen a seleccionar totes les categories

    // enviem els criteris buits al component pare
    this.aplicarFiltres.emit({
      text: '',
      categoria: '',
    });
  }

}