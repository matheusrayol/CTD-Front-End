export interface Character {
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
  bookmarked: boolean;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  previous: string | null;
}

export interface ApiData {
  info: Info,
  results: Character[]
}

export interface Episode {
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
  characters: Character[];
}

export const GET_CHARACTER = 'GET_CHARACTER';
export const GET_CHARACTERS_STARTED = 'GET_CHARACTERS_STARTED';
export const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
export const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';
export const GET_EPISODES = 'GET_EPISODES';
export const UPDATE_BOOKMARKED_CHARACTER_STATUS = 'UPDATE_BOOKMARKED_CHARACTER_STATUS';
export const GET_BOOKMARKED_CHARACTERS = 'GET_BOOKMARKED_CHARACTERS';
export const DELETE_BOOKMARKS = 'DELETE_BOOKMARKS';