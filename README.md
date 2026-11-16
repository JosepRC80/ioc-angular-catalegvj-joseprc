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


############################## EAC 2 - Exercici 4 - Control de flux, estats, pipe i detall ###########################################################


En aquest exercici s'ha actualitzat el catàleg de videojocs
per gestionar el llistat, els resultats de cerca i el detall
del videojoc seleccionat amb la sintaxi d'Angular 22.

### Funcionalitats implementades

- Ús de @for amb track videojoc.id per recórrer el catàleg.
- Ús de @if i @else per mostrar contingut condicional.
- Comptador de resultats mitjançant videojocs.length.
- Missatge informatiu quan no es troben videojocs.
- Panell de detall del videojoc seleccionat.
- Data de llançament formatada amb DatePipe.
- Restabliment de la selecció anterior quan s'apliquen nous filtres.

### Control de flux del llistat

El component LlistaVideojocs rep els videojocs filtrats
mitjançant @Input().

Si hi ha resultats, utilitza @for per mostrar les targetes.

Si no hi ha resultats, utilitza @else per mostrar el missatge:

"No s'han trobat videojocs que coincideixin amb els filtres."

El comptador s'actualitza automàticament segons el nombre
de videojocs que rep el component.

### Panell de detall

Quan l'usuari prem el botó "Seleccionar", el component App
guarda el videojoc seleccionat i en mostra la informació:

- Títol.
- Descripció.
- Categoria.
- Plataforma.
- Valoració.
- Data de llançament.

Quan no hi ha cap videojoc seleccionat, es mostra un missatge
indicant que cal seleccionar-ne un.

En aplicar filtres nous, es neteja la selecció anterior
per evitar mostrar informació d'un videojoc que ja no
apareix al llistat.

### Format de la data

S'utilitza DatePipe d'Angular per mostrar el camp
dataLlancament amb el format dd/MM/yyyy.

Exemple:

1985-09-13 -> 13/09/1985

### Fitxers modificats

- src/app/app.component.ts
- src/app/app.component.html
- src/app/components/llista-videojocs/llista-videojocs.component.html




############################## EAC 2 - Exercici  - Accessibilitat, responsive i lliurament ###########################################################


En aquest exercici s'ha millorat l'accessibilitat i
l'adaptació a diferents mides de pantalla del catàleg
de videojocs desenvolupat amb Angular 22.

### Accessibilitat

- S'ha afegit un enllaç "Salta al contingut principal".
- L'enllaç apunta a l'element main amb l'identificador
  contingut-principal.
- S'ha incorporat tabindex="-1" al contingut principal.
- S'ha utilitzat :focus-visible per destacar els elements
  interactius durant la navegació amb teclat.
- Els camps del formulari disposen d'etiquetes label
  associades mitjançant els atributs for i id.
- El comptador de resultats utilitza aria-live="polite".
- El missatge sense resultats utilitza role="status".
- El missatge d'error de validació utilitza role="alert".

### Disseny responsive

El formulari utilitza CSS Grid per distribuir els camps
de cerca, el selector de categoria i els botons.

També utilitza Flexbox per organitzar les etiquetes i els
controls dins de cada grup.

En pantalles de més de 600 píxels, el formulari es
distribueix en dues columnes.

En pantalles de 600 píxels o menys, s'utilitza:

    @media (max-width: 600px)

Aquesta regla adapta el formulari a una sola columna.

S'ha comprovat el comportament en diferents resolucions,
incloent-hi 393 x 852, 412 x 922 i 1280 x 800 píxels.

### Fitxers principals

- src/app/app.component.html
- src/app/app.component.scss
- src/styles.scss
- src/app/components/filtres-videojocs/filtres-videojocs.component.html
- src/app/components/filtres-videojocs/filtres-videojocs.component.scss
- src/app/components/llista-videojocs/llista-videojocs.component.html

### Branca de desenvolupament

Els exercicis de l'EAC2 es desenvolupen a la branca:

    ra2-components


### Versions de l'entorn de desenvolupament

El projecte s'ha desenvolupat amb les eines següents:

| Eina             | Versió |

| Angular          | 22.2.0 |
| Angular CLI      | 22.2.0 |
| Node.js          | 24.21.0 |
| npm              | 11.19.0 |
| TypeScript       | 6.0.3 |
| Sistema operatiu | Windows x64 |

Les versions s'han comprovat mitjançant la comanda:

```bash
ng version
```






############################## EAC3 - Serveis HTTP, formularis reactius i persistència ###########################################################

## Descripció de l'EAC3

En aquesta activitat s'ha ampliat el catàleg de videojocs
desenvolupat a l'EAC1 i l'EAC2.

S'ha incorporat una API REST local amb json-server,
un servei Angular per gestionar peticions HTTP,
models de dades i un adaptador.

També s'ha convertit el formulari de filtres a un
formulari reactiu amb validacions i s'ha implementat
un historial de cerques persistent amb localStorage.

## Versions utilitzades

- Angular: 22.2.0
- Angular CLI: 22.2.0
- Node.js: 24.21.0
- npm: 11.19.0
- TypeScript: 6.0.3
- Sistema operatiu: Windows x64
- json-server: dependència de desenvolupament del projecte

Les versions de l'entorn es poden consultar amb:

```bash
ng version
```

## Branca de desenvolupament

L'EAC3 s'ha desenvolupat a la branca:

`ra3-serveis`

Repositori:

https://github.com/JosepRC80/ioc-angular-catalegvj-joseprc

## Instal·lació i execució

Instal·lar les dependències:

```bash
npm install
```

Iniciar l'API REST local en un primer terminal:

```bash
npm run api
```

Iniciar Angular en un segon terminal:

```bash
npm start
```

Adreça de l'aplicació:

http://localhost:4200

Endpoint de l'API:

http://localhost:4301/videojocs

## API REST

L'API local utilitza json-server i les dades del fitxer:

`tools/api/videojocs.json`

El fitxer `src/environments/environment.ts`
centralitza l'adreça base de l'API.

Operacions implementades:

- GET /videojocs: recupera els videojocs.
- POST /videojocs: permet crear videojocs nous.

## Models i adaptador

S'utilitzen dos models:

- `VideojocApi`: representa les dades de l'API.
- `Element`: representa les dades internes del catàleg.

L'adaptador `adaptarVideojoc()` transforma les dades
rebudes de l'API abans d'utilitzar-les a l'aplicació.

Entre les normalitzacions implementades hi ha:

- Eliminació d'espais als extrems dels títols.
- Eliminació d'espais als extrems de les descripcions.
- Conversió de categories a minúscules.
- Conversió de plataformes a minúscules.
- Conservació dels identificadors com a string.

Fitxer de l'adaptador:

`src/app/adaptadors/videojoc.adaptador.ts`

## Servei HTTP

El servei `Videojocs` està definit a:

`src/app/services/videojocs.service.ts`

Utilitza HttpClient per comunicar-se amb l'API.

Mètodes principals:

- `obtenirVideojocs()`: consulta i adapta el catàleg.
- `crearVideojoc()`: envia un videojoc nou mitjançant POST.
- `comprovarResultats()`: comprova si una cerca té coincidències.

El component principal gestiona les consultes amb RxJS,
utilitzant `Subject`, `switchMap` i `catchError`.

Es mostren estats de càrrega i error mitjançant signals.

Quan l'API no respon, apareix un banner d'error
amb un botó per reintentar la consulta.

## Formulari reactiu

El formulari de filtres es troba a:

`src/app/components/filtres-videojocs/`

Utilitza ReactiveFormsModule, FormGroup i FormControl.

Funcionalitats implementades:

- Cerca de videojocs per títol.
- Filtratge per categoria.
- Validació síncrona amb Validators.minLength(3).
- Validació asíncrona consultant l'API.
- Espera de 400 ms abans de la consulta asíncrona.
- Missatges de validació i errors.
- Botó per restablir els filtres.
- Comunicació amb el component pare mitjançant @Output.

## Historial de cerques

S'ha implementat un historial persistent amb localStorage.

La clau utilitzada és:

`historialCerquesVideojocs`

Funcionalitats:

- Conserva les cinc darreres cerques vàlides.
- Evita duplicats del mateix text i categoria.
- Permet recuperar cerques anteriors.
- Manté les cerques després de recarregar la pàgina.
- Gestiona possibles errors amb try/catch.

## Accessibilitat i disseny responsive

L'aplicació utilitza:

- Etiquetes label associades als camps del formulari.
- role="status" per als missatges informatius.
- role="alert" per als missatges d'error.
- aria-live="polite" quan correspon.
- @if, @else i @for amb track per al control de flux.
- CSS responsive per adaptar la interfície a mòbils.

## Comprovacions del projecte

Compilar l'aplicació:

```bash
npm run build
```

Executar les proves automatitzades:

```bash
npm test
```

Comprovar l'estat del repositori:

```bash
git status
```

Consultar els darrers commits:

```bash
git log --oneline --decorate --max-count=5
```

## Documentació tècnica

La documentació de l'EAC3 es troba a:

- `docs/models.md`: models i mapatge de les dades.
- `docs/serveis.md`: servei HTTP, estats i reintent.
- `docs/formularis.md`: formulari reactiu, validacions i historial.

## Reproducció de l'aplicació

Per revisar el projecte cal instal·lar les dependències
amb npm install i mantenir en execució tant l'API local
com el servidor Angular.

L'API ha d'estar disponible al port 4301 abans de
comprovar les consultes del catàleg i els formularis.