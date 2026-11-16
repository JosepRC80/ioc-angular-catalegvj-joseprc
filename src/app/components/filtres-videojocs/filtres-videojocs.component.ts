
/**
 * Component de filtres de videojocs.
 *
 * Aquest component permetrà introduir criteris
 * de cerca i filtratge del catàleg.
 *
 * El formulari i les validacions es van començar
 * a desenvolupar durant l'Exercici 3 de l'EAC2.
 * A l'EAC3 adaptem el formulari a ReactiveFormsModule.
 */

import { Component, EventEmitter, inject, Output } from '@angular/core'; // Importem el decorador Component d'Angular
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms'; // Permet utilitzar formularis reactius i validacions
import { Videojocs } from '../../services/videojocs.service';
import { map, catchError, of, switchMap, timer, filter, take } from 'rxjs';

/** Defineix les dades que enviarem al component pare quan l'usuari apliqui els filtres de cerca */
export interface CriterisFiltre {
  text: string; // el text que volem cercar
  categoria: string; // la categoria que volem seleccionar
}

@Component({
  imports: [ReactiveFormsModule], // posem les eines, directives, components i funcionalitats que volem tenir disponibles a la plantilla HTML d'aquell component
  selector: 'app-filtres-videojocs', // Etiqueta HTML del component
  styleUrl: './filtres-videojocs.component.scss', // Fitxer d'estils SCSS
  templateUrl: './filtres-videojocs.component.html', // Plantilla HTML
})

export class FiltresVideojocs {

  @Output() aplicarFiltres = new EventEmitter<CriterisFiltre>(); // envia els criteris de filtratge al component pare

  // La clau que guarda i recupera l'historial del navegador
  private readonly clauHistorial = 'historialCerquesVideojocs';

  // Array que guardarà les darreres cerques vàlides
  historialCerques: CriterisFiltre[] = [];

  // Injectem el servei que permet consultar els videojocs de l'API
  private readonly videojocsService = inject(Videojocs);

  // Formulari reactiu que guarda el text de cerca i la categoria seleccionada
  formulariCerca = new FormGroup({
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3)],
      asyncValidators: [this.validarExistencia()]
    }),
    categoria: new FormControl('', {
      nonNullable: true
    })
  });

  constructor() {
    this.carregarHistorial();
  }

  /**
   * FormGroup agrupa els camps del formulari.
   * FormControl representa cadascun dels camps.
   * Validators.minLength(3) estableix una longitud mínima per al text de cerca.
   * nonNullable: true evita que els controls retornin null quan es reinicien.
   */

  /**
   * Validador asíncron que comprova si el terme cercat
   * té algun videojoc coincident a l'API.
   */
  private validarExistencia(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const terme = String(control.value ?? '').trim();

      if (terme.length < 3) {
        return of(null);
      }

      return timer(400).pipe(
        switchMap(() => this.videojocsService.comprovarResultats(terme)),
        map(existeix => existeix ? null : { senseResultats: true }),
        catchError(() => of({ errorApi: true }))
      );
    };
  }

  // Recuperar les cerques guardades al navegador
  private carregarHistorial(): void {
    try {
      // llegim les dades guardades al localStorage
      const dades = localStorage.getItem(this.clauHistorial);

      if (dades) {
        const historial = JSON.parse(dades);

        if (Array.isArray(historial)) {

        // Comprovem que les cerques recuperades tinguin el format correcte
        const cerquesValides: CriterisFiltre[] = historial.filter(
          (cerca): cerca is CriterisFiltre =>
            cerca !== null &&
            typeof cerca === 'object' &&
            typeof cerca.text === 'string' &&
            typeof cerca.categoria === 'string'
        );

        // Eliminem els duplicats, conservant la cerca més recent
        this.historialCerques = cerquesValides.filter(
          (cerca, index, totes) =>
            totes.findIndex(anterior =>
              anterior.text.toLowerCase() === cerca.text.toLowerCase() &&
              anterior.categoria === cerca.categoria
            ) === index
        ).slice(0, 5);

        // Actualitzem les dades guardades amb l'historial net
        localStorage.setItem(
          this.clauHistorial,
          JSON.stringify(this.historialCerques)
          );
        }
      }
    } catch (error) {
      // evitem que un error al local bloquegi l'aplicació
      console.error('Error en carregar l´historial:', error);
      this.historialCerques = [];
    }
  }

  // Guardem les darreres cerques vàlides al navegador
  private guardarCerca(criteris: CriterisFiltre): void {

    // evito guardar cerques sense text
    if (!criteris.text.trim()) {
      return;
    }

    // Eliminem les coincidències anteriors per evitar duplicats
    this.historialCerques = this.historialCerques.filter(cerca =>
      cerca.text.toLowerCase() !== criteris.text.toLowerCase() ||
      cerca.categoria !== criteris.categoria
    );

    // afegim la cerca al principi de l'historial
    this.historialCerques.unshift({ ...criteris });

    // conservem només les 5 darreres cerques
    this.historialCerques = this.historialCerques.slice(0, 5);

    // guardem l'historial al localStorage
    try {
      localStorage.setItem(
        this.clauHistorial,
        JSON.stringify(this.historialCerques)
      );
    } catch (error) {
      console.error('Error en guardar l´historial:', error);
    }
  }

  /** envia els criteris de filtratge al component pare */
  enviarFiltres(): void {

    // Comprovem que el formulari compleixi les validacions
    if (this.formulariCerca.invalid || this.formulariCerca.pending) {
      return;
    }

    // creem una constant que contindrà un objecte amb els valors actuals del formulari
    const criteris: CriterisFiltre = {
      text: this.formulariCerca.controls.text.value.trim(),
      categoria: this.formulariCerca.controls.categoria.value
    };

    // comprovo quines dades estic a punt d'enviar
    console.log('Filtres enviats:', criteris);

    // guardo la cerca vàlida a l'historial
    this.guardarCerca(criteris);

    // Emetem l'objecte perquè el component pare el pugui rebre
    this.aplicarFiltres.emit(criteris);
  }

  // botó per restablir tots els filtres
  restablirFiltres(): void {

    this.formulariCerca.reset(); // buidem el camp cerca i tornem a seleccionar totes les categories

    // enviem els criteris buits al component pare
    this.aplicarFiltres.emit({
      text: '',
      categoria: '',
    });
  }

  // Recupera una cerca de l'historial i torna a aplicar els filtres
  recuperarCerca(cerca: CriterisFiltre): void {

    // Recuperem el text i la categoria al formulari reactiu
    this.formulariCerca.patchValue({
      text: cerca.text,
      categoria: cerca.categoria
    });

    // Marquem el camp com a modificat
    this.formulariCerca.controls.text.markAsDirty();

    // Si la validació asíncrona està pendent, esperem que acabi
    if (this.formulariCerca.pending) {
      this.formulariCerca.statusChanges.pipe(
        filter(estat => estat !== 'PENDING'),
        take(1)
      ).subscribe(() => {
        if (this.formulariCerca.valid) {
          this.enviarFiltres();
        }
      });

      return;
    }

    // Si el formulari és vàlid, apliquem els filtres recuperats
    if (this.formulariCerca.valid) {
      this.enviarFiltres();
    }
  }
}
