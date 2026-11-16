import { Component, signal, inject, OnInit } from '@angular/core';
import { LlistaVideojocs } from './components/llista-videojocs/llista-videojocs.component'; // Importem el component de llista
import { ELEMENTS_MOCK } from './mocks/dades-mock'; // Importem els 10 videojocs simulats
import { Element } from './models/element.model'; // importem el model per tipar el videojoc seleccionat
import { FiltresVideojocs, type CriterisFiltre } from './components/filtres-videojocs/filtres-videojocs.component'; // component i tipus dels filtres
import { DatePipe } from '@angular/common'; // permet formatar dates a la plantilla html
import { Videojocs } from './services/videojocs.service'; // permet que el component principal conegui la classe del servei
import { Subject, switchMap, catchError, of } from 'rxjs';

@Component({
  imports: [LlistaVideojocs, FiltresVideojocs, DatePipe], // components disponibles a la plantilla HTML
  selector: 'app-root', // Selector del component principal
  styleUrl: './app.component.scss', // Fitxer d'estils
  templateUrl: './app.component.html', // Plantilla HTML
})

export class App implements OnInit {
  public elements = ELEMENTS_MOCK; // conté els 10 videojocs que enviarem al component fill
  public elementsFiltrats: Element[] = [...ELEMENTS_MOCK]; // llista de jocs que mostrarem després d'aplicar els filtres. **[...ELEMENTS_MOK] crea un nou array amb els mateixos videojocs que tenim a ELEMENTS_MOCK**
  protected readonly title = signal('ioc-angular-catalegvj-joseprc');
  public nomAplicacio = 'Catàleg de videojocs';
  public videojocSeleccionat: Element | null = null; // inicialemnt no hi ha cap videojoc seleccionat
  private readonly videojocsService = inject(Videojocs);
  public carregant = signal(false); // indica si tenim una petició HTTP en curs
  public missatgeError = signal(""); // guardarà el missatge que mostrarem si alguna cosa falla
  private readonly recarregar$ = new Subject<void>();

  ngOnInit(): void {
  this.recarregar$.pipe(
    switchMap(() => {
      this.carregant.set(true);
      this.missatgeError.set("");

      return this.videojocsService.obtenirVideojocs().pipe(
        catchError((error) => {
          console.error("Error en carregar els videojocs:", error);

          this.elements = [];
          this.elementsFiltrats = [];

          this.missatgeError.set("No s'han pogut carregar els videojocs.");
          this.carregant.set(false);

          return of(null);
        })
      );
    })
  ).subscribe({
    next: (videojocs) => {
      if (videojocs === null) return;

      this.elements = videojocs;
      this.elementsFiltrats = [...videojocs];
      this.carregant.set(false);
    }
  });

  this.recarregar$.next();
}
  reintentarCarrega(): void {
    this.recarregar$.next();
  }
/*  // Botó temporal per comprovar el POST!!
  provarPost(): void {
    const nouVideojoc = {
      titol: "Prova POST Angular EAC3",
      descripcio: "Videojoc creat des del servei Angular",
      categoria: "aventura",
      plataforma: "PC",
      dataLlancament: "2026-11-11",
      valoracio: 8,
      destacat: false
    };

    this.videojocsService.crearVideojoc(nouVideojoc).subscribe({
      next: (videojoc) => {
        console.log("Videojoc creat correctament!:", videojoc);
        this.reintentarCarrega();
      },
      error: (error) => {
        console.error("Error en crear el videojoc:", error);
      }
    });
  }
*/
  seleccionarVideojoc(videojoc: Element): void {
    this.videojocSeleccionat = videojoc; // Guardem el videojoc seleccionat
  }

  // rep els criteris enviats pel component FiltresVideojocs
  rebreFiltres(criteris: CriterisFiltre): void {

    // preparem el text per comparar-lo sense distinguir majúscules i minúscules
    const text = criteris.text.trim().toLowerCase();

    this.videojocSeleccionat = null; // eliminem la selecció anterior en aplicar nous filtres!!!!!!!

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