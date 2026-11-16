export interface VideojocApi {
    id: string,
    titol: string;
    descripcio: string;
    categoria: string;
    plataforma: string;
    dataLlancament: string;
    valoracio: number;
    destacat?: boolean;
}
