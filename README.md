# Nom de l'aplicació

Catàleg de videojocs


## Autor/a

Josep Riego Cladera


## Descripció

Aquesta aplicació és un catàleg de videojocs de tots els temps, plataformes i temàtica.


## Versions utilitzades

- Node.js: 24.21.0
- npm: 11.19.0
- Angular CLI: 22.2.0
- Git: 2.53.0.windows.2


## Com crear i executar el projecte

Instal·lar les dependències del projecte:
    npm install

Executar l'aplicació en mode desenvolupament:
    ng serve

Obrir un navegador i anar a l'adreça:
    http://localhost:4200



## Estat de l'EAC1


EAC1 completada: projecte Angular configurat, estructura inicial creada, repositori Git preparat i interfície base personalitzada.



## Enllaç del repositori

    https://github.com/JosepRC80/ioc-angular-catalegvj-joseprc.git


            
            
            ########################################################################################################################


### Comprovació del codi TypeScript

```bash
npx tsc --noEmit -p tsconfig.app.json
```

Aquesta comanda executa el compilador de TypeScript
per comprovar si hi ha errors de tipatge, sense generar
fitxers JavaScript nous.

- `npx`: executa el compilador instal·lat al projecte.
- `tsc`: compilador de TypeScript.
- `--noEmit`: evita generar fitxers de sortida.
- `-p`: indica el fitxer de configuració que s'utilitzarà.



###################################################### Exercici 2 - Components i comunicació #############################################################

Creació del component de llista amb Angular CLI:

```bash
ng generate component components/llista-videojocs --standalone
```

Aquest component serà responsable de mostrar el conjunt
de videojocs del catàleg mitjançant components de targeta.



### Component TargetaVideojoc

Comanda de creació:

```bash
ng generate component components/targeta-videojoc --standalone
```

Aquest component mostrarà les dades individuals d'un
videojoc i rebrà la informació del component de llista
mitjançant @Input.



### Component EtiquetaCategoria

Comanda de creació:

```bash
ng generate component components/etiqueta-categoria --standalone
```

Subcomponent reutilitzable que mostra la categoria
d'un videojoc. Rebrà aquesta informació des del
component TargetaVideojoc mitjançant @Input.




### Component FiltresVideojocs

Comanda de creació:

```bash
ng generate component components/filtres-videojocs --standalone
```

Aquest component permetrà cercar videojocs pel títol
i filtrar-los per categoria.

La comunicació amb el component principal es farà
mitjançant @Output, que notificarà els criteris
de cerca seleccionats per l'usuari.





##################################################### EAC2 - Exercici 3: Formulari de filtres ###########################################################

S'ha implementat un formulari per cercar videojocs per títol
i categoria.

### Funcionalitats implementades

- Formulari Angular amb FormsModule i [(ngModel)].
- Cerca combinada per text i categoria.
- Validacions required i minlength="3".
- Botó "Aplicar filtres" deshabilitat quan el camp és invàlid.
- Missatge d'error quan el text té menys de 3 caràcters.
- Botó "Restablir filtres" per recuperar els 10 videojocs.
- Distribució responsive del formulari amb CSS Grid.

### Fitxers principals

- src/app/components/filtres-videojocs/filtres-videojocs.component.ts
- src/app/components/filtres-videojocs/filtres-videojocs.component.html
- src/app/components/filtres-videojocs/filtres-videojocs.component.scss
- src/app/app.component.ts
- src/app/app.component.html
