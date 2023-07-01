import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { filterCharactersThunk, getCharactersThunk } from "../../redux/actions/characters.actions";
import { RootState } from '../../redux/types/character.types';
import { bindActionCreators } from 'redux';
import store from '../../redux/store';
import "./character-filter.css";

/**
 * Componente para controle do filtro de personagens
 * 
 * @returns Elemento JSX
 */
const Filtros = () => {
  const [filterValue, setFilterValue] = useState("");

  /**
   * Manipulador para o evento de alteração do campo de filtro.
   * @param {React.ChangeEvent<HTMLInputElement>} e Evento de alteração do campo.
   */
  const handleFilterInput = (e: any) => {
    setFilterValue(e.target.value);
  }

  /**
   * Limpa o filtro e busca todos os personagens.
   */
  const clearFilter = () => {
    setFilterValue("");
    getCharactersThunk()(store.dispatch);
  }

  useEffect(() => {
    filterCharactersThunk(filterValue)(store.dispatch);
  }, [filterValue])

  return (
    <div className="filters">
      <label htmlFor="nome">Filtrar por nome:</label>
      <input
        type="text"
        placeholder="Rick, Morty, Beth, Alien, ...etc"
        name="nome"
        onChange={handleFilterInput}
        value={filterValue}
      />
      <button className="danger" onClick={clearFilter}>Limpar filtro</button>
    </div>
  );
};

const MapStateToProps = (state: RootState) => ({
  characters: state.characters,
})

const MapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ filterCharactersThunk }, dispatch)
}


export default connect(MapStateToProps, MapDispatchToProps)(Filtros);
