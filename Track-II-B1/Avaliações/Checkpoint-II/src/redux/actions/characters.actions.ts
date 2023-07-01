import * as tipos from '../types/character.types';
import { addBookmarkToObject } from '../../utils/utils';

export const getCharactersStarted = () => ({ type: tipos.GET_CHARACTERS_STARTED });

/**
 * Action creator para obter todos os personagens
 * @function getCharactersSuccess
 * @param {tipos.ApiData} apiData - Objeto da API que consiste em informações para paginação e os dados que queremos
 * @returns {tipos.ActionType} - Payload contendo um array de objetos do tipo Character
 */
export const getCharactersSuccess = (apiData: tipos.ApiData): tipos.ActionType => ({
  type: tipos.GET_CHARACTERS_SUCCESS,
  payload: apiData
});

/**
 * Action creator para retornar uma mensagem de erro
 * @function getCharactersError
 * @param {string} errorMessage - Mensagem de erro da action
 * @returns {tipos.ActionType} - Payload contendo uma string com a mensagem de erro
 */
export const getCharactersError = (errorMessage: string): tipos.ActionType => ({
  type: tipos.GET_CHARACTERS_ERROR,
  payload: errorMessage
});

/**
 * Action creator para atualizar o estado de Favorito de um personagem
 * @function updateCharacterBookmark
 * @param {number} id - ID do personagem que precisa ter o estado da propriedade 'favorito' atualizado
 * @returns {tipos.ActionType} - Payload contendo o ID do personagem
 */
export const updateCharacterBookmark = (id: number): tipos.ActionType => ({
  type: tipos.UPDATE_BOOKMARKED_CHARACTER_STATUS,
  payload: id
});

/**
 * Action creator para remover todos os personagens marcados como favoritos
 * @function deleteBookmarks
 * @returns {tipos.ActionType} - Payload vazio
 */
export const deleteBookmarks = (): tipos.ActionType => ({
  type: tipos.DELETE_BOOKMARKS
});

/**
 * Action creator para buscar todos os personagens marcados como favoritos
 * @function getBookmarkedCharacters
 * @param {tipos.Character[]} characters - Array de objetos do tipo Character
 * @returns {tipos.ActionType} - Payload contendo um array de personagens marcados como favoritos
 */
export const getBookmarkedCharacters = (characters: tipos.Character[]): tipos.ActionType => ({
  type: tipos.GET_BOOKMARKED_CHARACTERS,
  payload: characters,
});

/**
 * Action creator para buscar apenas um personagem
 * @function getCharacter
 * @param {tipos.Character} character - Objeto do tipo Character
 * @returns {tipos.ActionType} - Payload contendo um objeto do tipo Character
 */
export const getCharacter = (character: tipos.Character): tipos.ActionType => ({
  type: tipos.GET_CHARACTER,
  payload: character,
});

/**
 * Action creator para buscar todos os episódios de um determinado personagem
 * @function getEpisodes
 * @param {tipos.Episode[]} episodes - Array de objetos do tipo Episódio
 * @returns {tipos.ActionType} - Payload contendo um array de episódios
 */
export const getEpisodes = (episodes: tipos.Episode[]): tipos.ActionType => ({
  type: tipos.GET_EPISODES,
  payload: episodes,
});

/**
 * Thunk para obter todos os personagens.
 * Faz uma requisição à API, adiciona a propriedade 'bookmarked' e utiliza o getCharactersSuccess para salvá-los.
 * @function getCharactersThunk
 */
export const getCharactersThunk = () => async (dispatch: any) => {
  dispatch(getCharactersStarted());

  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    const mutatedData = data.results.map((character: tipos.Character) => addBookmarkToObject(character));
    dispatch(getCharactersSuccess({ info: data.info, results: mutatedData }));
  } catch (error: any) {
    dispatch(getCharactersError(error.message));
  }
};

/**
 * Thunk para filtrar os personagens de acordo com um filtro recebido como parâmetro.
 * Faz uma requisição à API com o filtro, adiciona a propriedade 'bookmarked' nos objetos recebidos e utiliza o getCharactersSuccess para salvá-los.
 * @function filterCharactersThunk
 * @param {string} filtro - String necessária para filtrar os personagens
 */
export const filterCharactersThunk = (filtro: string) => async (dispatch: any) => {
  dispatch(getCharactersStarted());

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${filtro}`);
    const data = await response.json();
    const mutatedData = data.results.map((character: tipos.Character) => addBookmarkToObject(character));
    dispatch(getCharactersSuccess({ info: data.info, results: mutatedData }));
  } catch (error: any) {
    dispatch(getCharactersError(error.message));
  }
};

/**
 * Thunk para obter os personagens marcados como favoritos.
 * Faz uma requisição à API para recuperar os personagens que foram marcados como favoritos e alterar o estado da propriedade 'bookmarked' para true.
 * Utiliza o getBookmarkedCharacters para salvá-los.
 * @function getBookmarkedCharactersThunk
 * @param {number[]} idPersonagens - Array de IDs necessário para recuperar os personagens
 */
export const getBookmarkedCharactersThunk = (idPersonagens: number[]) => async (dispatch: any) => {
  dispatch(getCharactersStarted());

  try {
    let auxArray = [];
    const response = await fetch(`https://rickandmortyapi.com/api/character/${idPersonagens}`);
    const data = await response.json();

    if (!Array.isArray(data)) {
      auxArray.push(data);
    } else {
      auxArray.push(...data);
    }

    const mutatedData = auxArray.map((character: tipos.Character) => addBookmarkToObject(character, true));
    dispatch(getBookmarkedCharacters(mutatedData));
  } catch (error: any) {
    dispatch(getCharactersError(error.message));
  }
};

/**
 * Thunk para obter uma nova página de personagens.
 * Altera a página a ser renderizada na tela de início de acordo com o endpoint recebido por parâmetro e utiliza o getCharactersSuccess para salvar os dados.
 * @function getNewPageThunk
 * @param {string} url - Endpoint da nova página a ser renderizada
 */
export const getNewPageThunk = (url: string) => async (dispatch: any) => {
  dispatch(getCharactersStarted());

  try {
    const response = await fetch(url);
    const data = await response.json();
    const mutatedData = data.results.map((character: tipos.Character) => addBookmarkToObject(character));
    dispatch(getCharactersSuccess({ info: data.info, results: mutatedData }));
  } catch (error: any) {
    dispatch(getCharactersError(error.message));
  }
};

/**
 * Thunk para obter apenas um personagem.
 * Faz uma requisição à API para recuperar apenas um personagem de acordo com o ID recebido por parâmetro e salva-o usando o getCharacter.
 * @function getCharacterThunk
 * @param {string} id - ID usado para recuperar determinado personagem
 */
export const getCharacterThunk = (id: string) => async (dispatch: any) => {
  dispatch(getCharactersStarted());

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json();
    const mutatedData = addBookmarkToObject(data);
    dispatch(getCharacter(mutatedData));
  } catch (error: any) {
    dispatch(getCharactersError(error.message));
  }
};

/**
 * Thunk para obter os episódios que um personagem aparece.
 * Faz uma requisição à API para recuperar todos os episódios que determinado personagem participou e usa o getEpisodes para salvá-los.
 * @function getEpisodesThunk
 * @param {string[]} idEpisodes - Lista de IDs dos Episódios a serem recuperados
 */
export const getEpisodesThunk = (idEpisodes: string[]) => async (dispatch: any) => {
  try {
    let auxArray = [];
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${idEpisodes}`);
    const data = await response.json();

    if (!Array.isArray(data)) {
      auxArray.push(data);
    } else {
      auxArray.push(...data);
    }

    dispatch(getEpisodes(auxArray));
  } catch (error: any) {
    dispatch(getCharactersError(error.message));
  }
};