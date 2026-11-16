import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // ens permet obrir la URL base sense escriure http://locaclhost:4301 directament al servei
import { VideojocApi } from '../models/videojoc-api.model'; // permetrà indicar quin tipus de dades esperem rebre
import { map } from 'rxjs'; // permet transformar les dades rebudes mitjançant el nostre adaptador
import { adaptarVideojoc } from '../adaptadors/videojoc.adaptador';

@Service()
export class Videojocs {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/videojocs`;

    obtenirVideojocs() {  // GET
        return this.http.get<VideojocApi[]>(this.apiUrl).pipe(
            map(Videojocs => Videojocs.map(Videojoc => adaptarVideojoc(Videojoc)))
        );
        /**
         * this.http.get() prepara una petició HTTP GET.
         * <VideojocApi[]> indica que esperem rebre un array d'objectes del tipus VideojocApi.
         * this.apiUrl és l'adreça de la nostra API.
         */
    }

    crearVideojoc(videojoc: Omit<VideojocApi, 'id'>) {  // POST
        return this.http.post<VideojocApi>(this.apiUrl, videojoc).pipe(
            map(resposta => adaptarVideojoc(resposta))
        );
        /**
         * crearVideojoc(...) rep les dades del videojoc que volem crear.
         * Omit<VideojocApi, 'id'> indica que no hem d'enviar un identificador, perquè json-server l'assignarà.
         * http.post() envia les dades al servidor.
         * map() transforma la resposta del servidor mitjançant l'adaptador.
         * El resultat serà un objecte Element normalitzat.
         */
    }

    comprovarResultats(terme: string) {
        return this.obtenirVideojocs().pipe(
            map(Videojocs => Videojocs.some(Videojoc => Videojoc.titol.toLowerCase().includes(
                terme.toLowerCase().trim()
            )))
        );
    }
}



/** Apunts;
 * Service, indica a Angular que aqeusta classe és un servei
 * inject, permet demanar a Angular una depnedència que necessitem
 * HttpClient, és l'eina per comunicar-nos amb l'API
 * private readonly http, desa la referència a HttpClient dins del servei, perquè puguem utilitzar més endavant
 */
