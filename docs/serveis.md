
# EAC3 - Documentació del servei HTTP

## 1. Servei de videojocs

El servei HTTP es troba al fitxer:

`src/app/services/videojocs.service.ts`

La seva responsabilitat és centralitzar la comunicació
amb l'API REST local i evitar que els components
construeixin directament les peticions HTTP.

Utilitza `HttpClient` d'Angular.

## 2. Configuració de l'API

L'API local es gestiona amb json-server.

Fitxer de dades:

`tools/api/videojocs.json`

Comanda per iniciar-la:

```bash
npm run api
```

Endpoint principal:

`http://localhost:4301/videojocs`

L'adreça base es configura al fitxer:

`src/environments/environment.ts`

## 3. Petició GET

Mètode: `obtenirVideojocs()`

Recupera una llista de videojocs mitjançant HTTP GET.

La resposta de l'API es transforma amb RxJS `map()`
i la funció `adaptarVideojoc()`.

El resultat és una llista d'objectes del model intern
`Element[]`.

## 4. Petició POST

Mètode: `crearVideojoc()`

Permet crear un videojoc nou mitjançant HTTP POST.

Rep un objecte del model `VideojocApi` sense
la propietat `id`, ja que json-server genera
l'identificador del nou registre.

La resposta es transforma amb `adaptarVideojoc()`.

S'ha comprovat que el servidor retorna el
codi HTTP `201 Created` quan es crea un videojoc.

## 5. Comprovació de resultats

Mètode: `comprovarResultats(terme)`

Consulta els videojocs de l'API i comprova si
algun títol conté el terme cercat.

Retorna un `Observable<boolean>`:

- `true`: existeix almenys una coincidència.
- `false`: no hi ha coincidències.

Aquest mètode és utilitzat pel validador asíncron
del formulari de cerca.

## 6. Gestió de l'estat de càrrega

Al component principal `App` s'utilitza el signal
`carregant`.

Abans d'iniciar la petició:

`carregant.set(true)`

Quan finalitza:

`carregant.set(false)`

La plantilla mostra un missatge de càrrega
mitjançant `@if (carregant())`.

## 7. Gestió d'errors

Els errors de consulta es capturen amb
l'operador RxJS `catchError()`.

Quan falla la petició:

- Es buida la llista de videojocs.
- S'actualitza el signal `missatgeError`.
- Es desactiva l'estat de càrrega.
- Es mostra un banner d'error accessible.

La plantilla utilitza `role="alert"`.

## 8. Reintent de l'última consulta

El component principal disposa del mètode
`reintentarCarrega()`.

Aquest mètode emet un esdeveniment al Subject
`recarregar$`.

L'operador `switchMap()` inicia una nova
consulta HTTP GET.

Quan hi ha un error, `catchError()` retorna
`of(null)` per evitar que finalitzi el flux
de recàrrega.

Això permet reintentar la consulta sense
recarregar tota la pàgina.

## 9. Proves realitzades

S'han comprovat les operacions següents:

- GET a `/videojocs` amb resposta `200 OK`.
- POST a `/videojocs` amb resposta `201 Created`.
- Càrrega dels videojocs al catàleg Angular.
- Visualització de l'estat de càrrega.
- Banner d'error quan json-server està aturat.
- Recuperació del catàleg mitjançant el botó Reintentar.

## 10. Fitxers relacionats

- `src/app/services/videojocs.service.ts`
- `src/app/adaptadors/videojoc.adaptador.ts`
- `src/app/models/videojoc-api.model.ts`
- `src/app/models/element.model.ts`
- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/environments/environment.ts`
- `tools/api/videojocs.json`
