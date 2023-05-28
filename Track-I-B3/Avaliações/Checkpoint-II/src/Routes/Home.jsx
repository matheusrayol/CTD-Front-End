import { useEffect, useState } from "react";
import Card from "../Components/Card";

const Home = () => {
	const [dentista, setDentista] = useState([]);

	useEffect(() => {
		try {
			fetch("https://dhodonto.ctdprojetos.com.br/dentista")
				.then((response) => response.json())
				.then((data) => setDentista(data));
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<section className={`py-0`}>
			<div className={`container py-4 py-xl-5`}>
				<div className={`row mb-5`}>
					<div className={`col-md-8 col-xl-6 text-center mx-auto`}>
						<h2 className={`display-6 fw-bold mb-4`}>Home</h2>
					</div>
				</div>
				<div className={`row gy-4 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4`}>
					{dentista.length ? dentista.map((dentista) => (<Card {...dentista} key={dentista.matricula} />)) : (<div className={`col`}>Carregando...</div>)}
				</div>
			</div>
		</section>
	);
};

export default Home;
