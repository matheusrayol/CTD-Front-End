import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useNavigate } from 'react-router-dom';
import { Character, RootState } from "../../redux/types/character.types";
import { updateCharacterBookmark } from "../../redux/actions/characters.actions";
import BookmarkButton from "../bookmarkButton/bookmark-button.component";
import "./character-card.css";

type Props = {
  character: Character;
}

type CharacterCardProps = Props & ConnectedProps<typeof connector>;

/**
 * Componente para geração de cards de personagens dentro da grade da aplicação.
 * @param {CharacterCardProps} props Propriedades do componente.
 * @param {Character} props.character Personagem a ser renderizado.
 * @returns {JSX.Element}
 */
const CharacterCard = ({ character, updateCharacterBookmark }: CharacterCardProps): JSX.Element => {
  const navigate = useNavigate();

  /**
   * Manipulador para o evento de clique no botão de favorito.
   */
  const bookmarkHandler = () => {
    updateCharacterBookmark(character.id);
  }

  /**
   * Manipulador para o evento de clique no botão de detalhe.
   */
  const detailsHandler = () => {
    navigate(`/${character.id}`)
  }

  return (
    <div className="card-character">
      <img src={character.image} alt={character.name} />
      <div className="card-character-body">
        <span className="truncate-text">{character.name}</span>
        <button className="primary" onClick={detailsHandler}>Detalhes</button>
        <BookmarkButton isBookmarked={character.bookmarked} bookmarkHandler={bookmarkHandler} />
      </div>
    </div>
  );
};

// Mapeia o estado do Redux para as propriedades do componente
const mapStateToProps = (state: RootState) => ({});

// Mapeia as ações do Redux para as propriedades do componente
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ updateCharacterBookmark }, dispatch)
}

// Conecta o componente ao Redux
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CharacterCard);