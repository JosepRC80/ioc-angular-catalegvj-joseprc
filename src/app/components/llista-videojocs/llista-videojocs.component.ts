
/**
 * Component de llista de videojocs.
 *
 * Aquest component rep un conjunt de videojocs
 * i s'encarrega de mostrar-los al catàleg.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core'; // Importem Component i Input d'Angular
import { Element } from '../../models/element.model'; // Importem el model dels videojocs
import { TargetaVideojoc } from '../targeta-videojoc/targeta-videojoc.component'; // Importem el component de targeta


/**
 * @Component defineix la configuració del component Angular.
 */
@Component({
  imports: [TargetaVideojoc], // Components necessaris per a la plantilla html
  selector: 'app-llista-videojocs', // Etiqueta HTML del component
  styleUrl: './llista-videojocs.component.scss', // Fitxer d'estils
  templateUrl: './llista-videojocs.component.html', // Plantilla HTML
})
export class LlistaVideojocs {

  @Input() videojocs: Element[] = []; // Rep un array de videojocs del component pare

  @Output() seleccionarVideojoc = new EventEmitter<Element>(); // emet el videojoc seleccionat ca a App

  
  notificarSeleccio(videojoc: Element): void { // Rep el videojoc seleccionat des de la targeta
    this.seleccionarVideojoc.emit(videojoc); // Transmet l'esdeveniment al component principal
  }


}
