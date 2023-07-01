import * as types from '../types/character.types';
import { Character, Info } from '../types/character.types';

// Estado inicial do reducer
const initialState = {
  isFetching: false,
  characters: [],
  character: {} as Character,
  bookmarkedCharacters: [],
  episodes: [],
  bookmarkedCharacterId: [] as any[],
  errorMessage: undefined,
  pagination: {} as Info,
}

export const characterReducer = (state = initialState, action: types.ActionType) => {
  switch (action.type) {
    case types.GET_CHARACTERS_STARTED:
      // Inicia a busca dos personagens
      return {
        ...state,
        isFetching: true,
      }
    case types.GET_CHARACTERS_SUCCESS:
      // Sucesso na busca dos personagens
      return {
        ...state,
        isFetching: false,
        pagination: action.payload.info,
        characters:
          action.payload.results.map((character: Character) => {
            // Verifica se o personagem está marcado como favorito
            if (state.bookmarkedCharacterId.find((el: number) => el === character.id)) {
              return {
                ...character,
                bookmarked: true,
              }
            }
            return character;
          })
      }
    case types.GET_CHARACTER:
      // Sucesso na busca de um personagem específico
      return {
        ...state,
        isFetching: false,
        character: state.bookmarkedCharacterId.find(el => el === action.payload.id) ? { ...action.payload, bookmarked: true } : action.payload,
      }
    case types.GET_EPISODES:
      // Sucesso na busca dos episódios de um personagem
      return {
        ...state,
        episodes: action.payload,
      }
    case types.GET_CHARACTERS_ERROR:
      // Erro na busca dos personagens
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case types.GET_BOOKMARKED_CHARACTERS:
      // Sucesso na busca dos personagens marcados como favoritos
      return {
        ...state,
        isFetching: false,
        bookmarkedCharacters: action.payload,
      }
    case types.UPDATE_BOOKMARKED_CHARACTER_STATUS:
      // Atualiza o status de favorito de um personagem
      return {
        ...state,
        character: state.character.id === action.payload ? {
          ...state.character,
          bookmarked: !state.character.bookmarked
        } : state.character,
        bookmarkedCharacterId:
          state.bookmarkedCharacterId.find(id => id === action.payload) ?
            state.bookmarkedCharacterId.filter(id => id !== action.payload) :
            [...state.bookmarkedCharacterId, action.payload],
        bookmarkedCharacters:
          state.bookmarkedCharacters.find((character: Character) => character.id === action.payload) ?
            state.bookmarkedCharacters.filter((character: Character) => character.id !== action.payload) :
            [...state.bookmarkedCharacters],
        characters:
          state.characters.map((character: Character) => {
            if (character.id !== action.payload) {
              return character;
            }
            return {
              ...character,
              bookmarked: !character.bookmarked,
            };
          })
      }
    case types.DELETE_BOOKMARKS:
      // Remove todos os personagens marcados como favoritos
      return {
        ...state,
        bookmarkedCharacters: [],
        bookmarkedCharacterId: [],
        characters: state.characters.map((character: Character) => ({ ...character, bookmarked: false }))
      }
    default:
      return state;
  }
}
