export const GET_PERSONAGEM = 'GET_PERSONAGEM';
export const GET_PERSONAGENS_STARTED = 'GET_PERSONAGENS_STARTED';
export const GET_PERSONAGENS_SUCCESS = 'GET_PERSONAGENS_SUCCESS';
export const GET_PERSONAGENS_ERROR = 'GET_PERSONAGENS_ERROR';
export const GET_EPISODIOS = 'GET_EPISODIOS';
export const SET_PERSONAGEM_FAVORITO = 'SET_PERSONAGEM_FAVORITO';
export const GET_PERSONAGENS_FAVORITOS = 'GET_PERSONAGENS_FAVORITOS';
export const DELETE_BOOKMARKS = 'DELETE_BOOKMARKS';

export interface Personagem {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: object;
    location: object;
    image: string;
    episode: string;
    url: string;
    created: string;
    favorito: boolean;
}

export interface Info {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface ApiData {
    info: Info,
    results: Personagem[]
}

export interface Episodio {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}

export type ActionType = {
    type: string;
    payload?: any;
}

export type RootState = {
    personagens: Personagem[];
}


