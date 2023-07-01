import "./Details.css";
import BookmarkButton from "../components/bookmarkButton/bookmark-button.component";
import CardEpisode from "../components/episodesCard/episodes-card.component";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { getEpisodesThunk, getCharacterThunk, updateCharacterBookmark } from "../redux/actions/characters.actions";
import { RootState, Episode } from "../redux/types/character.types";
import store from '../redux/store';
import {useEffect} from "react";
import { useParams } from "react-router-dom";
import { getEpisodesId } from "../utils/utils";

/**
 * Esta é a página de detalhes. Aqui você pode mostrar a visão do character selecionado junto com a lista de episódios em que ele aparece
 * Uso:
 * ``` <CharacterDetails /> ```
 *
 * @returns Página de detalhes do personagem
 */
const CharacterDetails = () => {
  const { id } = useParams();
  const { character, isFetching, episodes } = store.getState().characters;
 
  const bookmarkHandler = () => {

    store.dispatch(updateCharacterBookmark(character.id))

  }

  useEffect(() => {

    if(id) getCharacterThunk(id)(store.dispatch)

  },[id])

  useEffect(() => {
    if(character.episode) {

      let idEpisodes = getEpisodesId(character.episode);
      getEpisodesThunk(idEpisodes)(store.dispatch);
      
    }

  },[character.episode])

  return (
    <>
    {isFetching && <span>Carregando dados do personagem...</span>}
    {!isFetching && 
      <div className="container">
        <h3>{character?.name}</h3>
        <div className={"detail"}>
          <div className={"header-detail"}>
            <img src={character?.image} alt={character?.name}
            />
            <div className={"header-detail-text"}>
              <p>{character?.name}</p>
              <p>Planeta: {character?.origin?.name}</p>
              <p>Gênero: {character?.gender}</p>
            </div>
            <BookmarkButton isBookmarked={character?.bookmarked} bookmarkHandler={bookmarkHandler} />
          </div>
        </div>
        <h3>Episódios nos quais este personagem aparece</h3>
      <div className={"episodes-grid"}>
        {episodes.length && 
          episodes.map((episode: Episode) => {
            return <CardEpisode programEpisode={episode} key={episode.id} />
          })
        }
      </div>
    </div>}
    </>)
}

const mapStateToProps = (state: RootState) => ({
  characters: state.characters,
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ getCharacterThunk, updateCharacterBookmark }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetails);