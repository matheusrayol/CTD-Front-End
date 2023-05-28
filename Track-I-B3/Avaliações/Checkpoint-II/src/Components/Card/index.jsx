import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Contexts/GlobalContext";

const Card = ({ nome, matricula, usuario }) => {
	const { theme } = useContext(GlobalContext);
	const isDarkMode = theme === "dark" || false;

	return (
		<>
			<div className={`col`}>
				<div className={`card h-100 ${isDarkMode ? "card-dark text-light" : "card-light text-dark"}`}>
					<div className={`card-body border-5 d-flex flex-column justify-content-between p-4`}>
						<div className={`pb-4`}>
							<h4 className={`fw-bold`}>{nome}</h4>
							<h6 className={`fw-bold`}>{usuario?.username}</h6>
							<img className={`w-100`} src="images/doctor.jpg" alt={nome} />
						</div>
						<Link className={`btn btn-dhodonto`} to={`/dentist/${matricula}`} role="button">Visualizar Perfil</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
