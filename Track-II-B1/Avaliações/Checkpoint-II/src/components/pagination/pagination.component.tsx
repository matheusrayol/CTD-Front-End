import { RootState } from "../../redux/types/character.types";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { getNewPageThunk } from '../../redux/actions/characters.actions';
import store from '../../redux/store';
import "./pagination.css";

const mapStateToProps = (state: RootState) => ({
  characters: state.characters
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ getNewPageThunk }, dispatch);
}

/**
 * Componente contendo os botões da paginação de characters.
 * @returns {JSX.Element}
 */
const Pagination = (): JSX.Element => {

  const { pagination } = store.getState().characters;

  const nextPageHandler = () => {
    if (!pagination.next) return;

    getNewPageThunk(pagination.next)(store.dispatch)
  }

  const previousPageHandler = () => {
    if (!pagination.previous) return;

    getNewPageThunk(pagination.previous)(store.dispatch)
  }
  return (
    <div className="pagination">
      <button disabled={!pagination.previous} onClick={previousPageHandler} className={"pagination"}>
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 448 512"><path style={{ fill: '#FFF' }} d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      </button>
      <button disabled={!pagination.next} onClick={nextPageHandler} className={"pagination"}>
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 448 512"><path style={{ fill: '#FFF' }} d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
      </button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
