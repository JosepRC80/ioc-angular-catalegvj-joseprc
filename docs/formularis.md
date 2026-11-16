
# EAC3 - Documentació del formulari reactiu

## 1. Component del formulari

El formulari de cerca es troba a:

`src/app/components/filtres-videojocs/`

Fitxers principals:

- `filtres-videojocs.component.ts`
- `filtres-videojocs.component.html`
- `filtres-videojocs.component.scss`

Utilitza `ReactiveFormsModule` d'Angular.

## 2. Estructura del formulari

El formulari està definit amb `FormGroup` i conté
dos controls:

- `text`: camp de cerca de videojocs.
- `categoria`: selector de categoria.

Els controls utilitzen `nonNullable: true` per evitar
que retornin `null` en restablir el formulari.

## 3. Validació síncrona

El camp `text` utilitza:

`Validators.minLength(3)`

Quan l'usuari introdueix menys de tres caràcters,
el formulari és invàlid i es mostra un missatge d'error.

El botó «Aplicar filtres» queda desactivat
mentre el formulari és invàlid.

## 4. Validació asíncrona

El mètode `validarExistencia()` comprova si el terme
cercat té algun resultat a l'API.

Utilitza el mètode `comprovarResultats()` del servei
`Videojocs`.

Resultats de la validació:

- `null`: existeixen videojocs coincidents.
- `senseResultats`: no s'han trobat coincidències.
- `errorApi`: no s'ha pogut consultar l'API.

La validació asíncrona només consulta l'API quan
el terme té almenys tres caràcters.

## 5. Debounce

La validació asíncrona utilitza:

`timer(400)`

Això introdueix una espera de 400 mil·lisegons
abans de consultar l'API.

També s'utilitza `switchMap()` per iniciar
la consulta després de l'espera.

## 6. Missatges de validació

La plantilla HTML mostra:

- Error de longitud mínima.
- Estat de validació asíncrona en curs.
- Missatge quan no hi ha resultats.
- Missatge quan falla la consulta a l'API.

S'utilitzen `role="alert"`, `role="status"`
i `aria-live="polite"` per millorar l'accessibilitat.

## 7. Aplicació dels filtres

El mètode `enviarFiltres()` comprova que el formulari
sigui vàlid i que no tingui una validació pendent.

Després crea un objecte `CriterisFiltre` amb:

- `text`
- `categoria`

Aquest objecte s'envia al component principal
mitjançant `@Output() aplicarFiltres`.

## 8. Restabliment

El mètode `restablirFiltres()` executa:

`this.formulariCerca.reset()`

Després emet els criteris buits al component pare,
per tornar a mostrar el catàleg complet.

## 9. Historial de cerques

L'historial es desa a `localStorage` amb la clau:

`historialCerquesVideojocs`

Es conserven les cinc darreres cerques vàlides,
amb el text i la categoria.

El mètode `guardarCerca()` elimina les coincidències
anteriors abans de guardar una cerca nova.

El mètode `carregarHistorial()` recupera les dades
en iniciar el component, valida la seva estructura
i elimina els duplicats antics.

## 10. Recuperació de cerques

La plantilla mostra les darreres cerques amb `@for`.

Cada cerca disposa d'un botó que executa:

`recuperarCerca(cerca)`

Aquest mètode recupera els valors amb `patchValue()`
i espera que finalitzi la validació asíncrona abans
d'aplicar els filtres.

## 11. Gestió d'errors de localStorage

Els mètodes `guardarCerca()` i `carregarHistorial()`
utilitzen blocs `try/catch`.

Això permet controlar errors d'accés, lectura
o escriptura de `localStorage` sense bloquejar
el funcionament de l'aplicació.

## 12. Proves realitzades

S'ha comprovat:

- Cerca de videojocs amb resultats.
- Validació de longitud mínima.
- Validació asíncrona sense coincidències.
- Filtratge per categoria.
- Restabliment del formulari.
- Persistència de l'historial després de recarregar.
- Recuperació d'una cerca anterior.
- Eliminació de cerques duplicades.
