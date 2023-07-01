import CharactersGrid from "../components/charactersGrid/character-grid.component";
import store from '../redux/store';
import { connect } from 'react-redux';
import { RootState } from '../redux/types/character.types';
import { useEffect } from "react";
import { getBookmarkedCharactersThunk, deleteBookmarks } from "../redux/actions/characters.actions";
import { bindActionCreators } from 'redux';

/**
 * Esta é a página de favoritos. Aqui você deve ver todos os characters marcados como favoritos
 *
 * Uso:
 * ``` <BookmarksPage /> ```
 *
 * @returns Página de favoritos
 */
const BookmarksPage = () => {
  const { bookmarkedCharacterId, bookmarkedCharacters, isFetching, errorMessage } = store.getState().characters;
  
  useEffect(() => {
    if (!bookmarkedCharacterId.length) return;

    getBookmarkedCharactersThunk(bookmarkedCharacterId)(store.dispatch);
  }, [bookmarkedCharacterId]);

  const deleteBookmarksHandler = () => {
    store.dispatch(deleteBookmarks());
  };

  return (
    <div className="container">
      <div className="actions">
        <h3>Personagens Favoritos</h3>
        <button disabled={!bookmarkedCharacterId.length} className="danger" onClick={deleteBookmarksHandler}>
          Limpar favoritos
        </button>
      </div>
      {errorMessage && <span>Ocorreu um erro ao recuperar os personagens favoritos: {errorMessage}</span>}
      {isFetching && <span>Carregando personagens favoritos...</span>}
      {!bookmarkedCharacterId.length ? (
        <span className="empty-bookmarks">Você não possui nenhum personagem favorito.</span>
      ) : (
        <CharactersGrid characters={bookmarkedCharacters} />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  characters: state.characters
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      deleteBookmarks,
      getBookmarkedCharactersThunk
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksPage);
