import { Component, Input, Output, EventEmitter } from '@angular/core'; // importem Component i Input d'Angular
import { Element } from '../../models/element.model'; // Importem el nostre model de videojocs
import { EtiquetaCategoria } from '../etiqueta-categoria/etiqueta-categoria.component';


@Component({
  imports: [EtiquetaCategoria], // permet utilitzar l'etiqueta dins de la targeta
  selector: 'app-targeta-videojoc',
  styleUrl: './targeta-videojoc.component.scss',
  templateUrl: './targeta-videojoc.component.html',
})
export class TargetaVideojoc {

  @Input({ required: true }) videojoc!: Element; // Rep un videojoc del component pare

  @Output() seleccionar = new EventEmitter<Element>(); // Esdeveniment que envia un videojoc al component pare

  seleccionarVideojoc(): void { // mètode que executarem quan l'usuari premi el botó
    this.seleccionar.emit(this.videojoc); // emet el videojoc actual mitjançant EventEmitter
  }

}
