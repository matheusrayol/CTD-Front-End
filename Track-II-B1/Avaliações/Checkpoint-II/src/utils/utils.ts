import { Character } from "../redux/types/character.types";

// Função que adiciona o atributo 'Favorito' em um objeto
export const addBookmarkToObject = (obj: Character, initialValue = false) => ({...obj, bookmarked: initialValue})

export const getEpisodesId = (episodes: string[]) => {

  let ids = episodes.map(episode => {
       let index = episode.indexOf("e/");
       return episode.slice(index + 2, episode.length);
  })

  return ids;
}

