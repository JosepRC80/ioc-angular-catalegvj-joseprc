import { VideojocApi } from "../models/videojoc-api.model";
import { Element } from "../models/element.model";

export function adaptarVideojoc(videojoc: VideojocApi): Element {
    return {
        id: videojoc.id,
        titol: videojoc.titol.trim(),
        descripcio: videojoc.descripcio.trim(), // no assigno minúscules per no perdre majúscules a noms propis
        categoria: videojoc.categoria.toLowerCase().trim(),
        plataforma: videojoc.plataforma.toLowerCase().trim(),
        dataLlancament: videojoc.dataLlancament,
        valoracio: videojoc.valoracio,
        destacat: videojoc.destacat,
    }
}