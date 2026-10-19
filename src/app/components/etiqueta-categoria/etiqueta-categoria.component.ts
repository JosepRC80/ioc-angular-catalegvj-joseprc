/**
 * Subcomponent d'etiqueta de categoria.
 *
 * Mostra el gènere d'un videojoc mitjançant
 * una etiqueta reutilitzable.
 */

import { Component, Input } from '@angular/core'; // Importem Component i Input d'Angular

@Component({
  imports: [], // Components necessaris per a la plantilla
  selector: 'app-etiqueta-categoria', // Etiqueta HTML del component
  styleUrl: './etiqueta-categoria.component.scss', // Fitxer d'estils SCSS
  templateUrl: './etiqueta-categoria.component.html', // Plantilla HTML
})
export class EtiquetaCategoria {

  @Input({ required: true }) categoria!: string; // Rep la categoria des del component pare

}