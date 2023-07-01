import Filtros from "../components/charactersFilter/character-filter.component";
import CharactersGrid from '../components/charactersGrid/character-grid.component';
import Pagination from "../components/pagination/pagination.component";
import store from '../redux/store';
import { connect } from 'react-redux';
import { RootState } from '../redux/types/character.types';
import { bindActionCreators } from 'redux';
import { getCharactersThunk } from "../redux/actions/characters.actions";
import { useEffect } from 'react';

/**
* Página inicial, que exibe as opções de filtro e a lista de personagens.
*
* Uso: ```<Home />```
* @returns Página inicial
*/
const Home = () => {

  const { isFetching, characters, errorMessage } = store.getState().characters;

  useEffect(() => {
    getCharactersThunk()(store.dispatch);
  }, [])

  return (
    <div className="container">
      <div className="actions">
        <h2>Catálogo de Personagens</h2>
      </div>
      <Filtros />
      <Pagination />
      {isFetching ?
        <span className="carregando">Carregando...</span>
        :
        <>
          <CharactersGrid characters={characters} />
          <Pagination />
        </>
      }
      {errorMessage && <span>Ocorreu um erro ao obter os personagens: {errorMessage}</span>}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  characters: state.characters
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ getCharactersThunk }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);