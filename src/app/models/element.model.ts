/**
 * Model de dades que defineix l'estructura dels elements del catàleg.
 * La interfície estableix les propietats i els tipus de dades
 * que ha de tenir cada element de l'aplicació.
 *
 * comanda per crear model: ng generate interface models/element --type=model
 */

export interface Element {
    id: number,
    titol: string;
    descripcio: string;
    categoria: string;
    plataforma: string;
    dataLlancament: string;
    valoracio: number;
    destacat?: boolean;
}
