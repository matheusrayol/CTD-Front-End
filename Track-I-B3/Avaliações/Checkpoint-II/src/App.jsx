
import { useEffect, useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "./Contexts/GlobalContext";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const { theme } = useContext(GlobalContext);
	const isDarkMode = theme === "dark" || false;

	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/home");
		}
	}, [location, navigate]);


	return (
		<>
			<div className={`app ${isDarkMode ? "dark-theme" : "light-theme"}`}>
				<Navbar />
				<main>
					<Outlet />
				</main>
				<Footer />
			</div>
		</>
	);
}

export default App;
