import { Episode } from "../../redux/types/character.types";
import React from 'react';
import "./episodes-card.css";

type Props = {
  programEpisode: Episode;
};

/**
 * Card para cada episódio na visualização do personagem.
 *
 * Este componente exibe as informações de um episódio, como nome, número e data de exibição.
 *
 * @param {Props} props Propriedades do componente.
 * @param {Episode} props.programEpisode Dados do episódio a ser exibido.
 * @returns {JSX.Element} Elemento JSX que representa o card do episódio.
 */
const CardEpisode: React.FC<Props> = ({ programEpisode }: Props): JSX.Element => {
  const { name, episode, air_date } = programEpisode;

  return (
    <div className="card-episode">
      <h4>{name}</h4>
      <div>
        <span>{episode}</span>
        <span>{air_date}</span>
      </div>
    </div>
  );
};

export default CardEpisode;
