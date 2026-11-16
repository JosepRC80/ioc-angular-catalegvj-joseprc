## Mapatge entre el model API i el model intern

| Propietat API      | Propietat interna      | Normalització         |
|--------------------|------------------------|-----------------------|
| 'id'               | 'id'                   | Cap                   |
|--------------------|------------------------|-----------------------|
| 'titol'            | 'titol'                | .trim()               |
|--------------------|------------------------|-----------------------|
| 'descripcio'       | 'descripcio'           | .trim()               |
|--------------------|------------------------|-----------------------|
| 'categoria'        | 'categoria'            | .toLowerCase().trim() |
|--------------------|------------------------|-----------------------|
| 'plataforma'       | 'plataforma'           | .toLowerCase().trim() |
|--------------------|------------------------|-----------------------|
| 'dataLlancament'   | 'dataLlancament'       | Cap                   |
|--------------------|------------------------|-----------------------|
| 'valoracio'        | 'valoracio'            | Cap                   |
|--------------------|------------------------|-----------------------|
| 'destacat'         | 'destacat'             | Cap                   |
|--------------------|------------------------|-----------------------|



## Identificadors dels videojocs

Els identificadors es representen com a "string" tant al model de l'API (`VideojocsApi`)
com al model intern (`Element`).

Aquesta decisió permet treballar amb identificadors numèrics representats com a text i també
amb identificadors alfanumèrics generats per json-server.

L'adaptador conserva l'identificador original sense transformar-lo.