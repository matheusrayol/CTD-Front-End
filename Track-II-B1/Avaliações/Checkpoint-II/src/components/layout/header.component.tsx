import { Link } from "react-router-dom";
import "./header.css";

/**
 * Cabeçalho que contém os links para navegar entre as páginas
 *
 * Uso: `<Header />`
 *
 * @returns Elemento JSX
 */
const Header = () => {
  return (
    <header>
      <div>
        <div>
          <h2>Checkpoint II - Front-End</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/favoritos">Favoritos</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;