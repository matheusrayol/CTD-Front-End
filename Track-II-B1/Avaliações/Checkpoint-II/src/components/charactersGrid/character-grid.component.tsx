import { Character } from "../../redux/types/character.types";
import CharacterCard from "../characterCard/character-card.component";
import "./character-grid.css";

type Props = {
  characters: Character[] | undefined,
}

/**
 * Grade de personagens para a página inicial.
 *
 * Este componente exibe uma grade de personagens, usando o componente `CharacterCard`
 * para cada personagem.
 *
 * @param {Props} props Propriedades do componente.
 * @param {Character[]} props.characters Lista de personagens a serem exibidos.
 * @returns {JSX.Element} Elemento JSX que representa a grade de personagens.
 */
const CharactersGrid = ({characters}: Props): JSX.Element => {

  return (
    <div className="characters-grid">
      {characters && 
        characters.map((character: Character) => {
        return <CharacterCard key={character.id} character={character} />
      })
      }
    </div>
  );
};

export default CharactersGrid;