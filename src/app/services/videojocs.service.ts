import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class Videojocs {
    private readonly http = inject(HttpClient);
}

/** Apunts;
 * Service, indica a Angular que aqeusta classe és un servei
 * inject, permet demanar a Angular una depnedència que necessitem
 * HttpClient, és l'eina per comunicar-nos amb l'API
 * private readonly http, desa la referència a HttpClient dins del servei, perquè puguem utilitzar més endavant
 */
