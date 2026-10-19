
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

@Component({
  imports: [], // Components i recursos necessaris
  selector: 'app-filtres-videojocs', // Etiqueta HTML del component
  styleUrl: './filtres-videojocs.component.scss', // Fitxer d'estils SCSS
  templateUrl: './filtres-videojocs.component.html', // Plantilla HTML
})
export class FiltresVideojocs {
  @Output() aplicarFiltres = new EventEmitter<void>(); // notificarà al component pare quan s'apliquin els filtres

}
