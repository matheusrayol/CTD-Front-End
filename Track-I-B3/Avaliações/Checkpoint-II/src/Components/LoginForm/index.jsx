import { useContext, useEffect } from "react";
import { render } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Contexts/GlobalContext";
import { setToken } from "../../Services/localStorage";

import styles from "./styles.module.css";

const LoginForm = () => {
	const { theme, doLogin } = useContext(GlobalContext);
	const isDarkMode = theme === "dark" || false;
	const navigate = useNavigate();

	// Adiciona um eventListener para verificar o campo login e password
	useEffect(() => {
		window.addEventListener('input', (event) => {
			if (event.target.matches('input[name="login"]')) {
				if (event.target.value.length < 5) {
					event.target.style.border = '3px solid red';
				} else {
					event.target.style.removeProperty('border');
				}
			}
			if (event.target.matches('input[name="password"]')) {
				if (event.target.value.length < 5) {
					event.target.style.border = '3px solid red';
				} else {
					event.target.style.removeProperty('border');
				}
			}
		});
	});


	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		try {
			fetch(`https://dhodonto.ctdprojetos.com.br/auth`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: data.login,
					password: data.password,
				}),
			})
				.then(response => {
					if (response.ok) {
						response.json()
							.then((data) => {
								setToken(data.token);
								doLogin();
								navigate("/home");
							})
					}
					else {
						render(<span>Verifique os dados informados e tente novamente.</span>, document.getElementById("loginAlert"))
					}
				})
		}
		catch (error) {
			console.log(error);
		}
	}

	return (
		<>

			<section className={`d-grid align-items-center mb-5 ${isDarkMode ? styles.cardDark : ""}`} style={{ height: "80vh" }}>
				<div className={`container py-md-5`}>
					<div className={`row align-items-center`}>
						<div className={`col-md-6 text-center`}>
							<img className={`img-fluid w-75`} src="images/Fingerprint-rafiki.svg" alt="Login" />
						</div>
						<div className={`col-md-5 col-xl-4 text-center text-md-start`}>
							<h2 className={`display-6 fw-bold mb-5`}>
								<span className={`underline pb-1`}>
									<strong>Fazer Login</strong>
								</span>
							</h2>
							<form onSubmit={handleSubmit}>
								<div className={`mb-3`}>
									<input className={`shadow-sm form-control ${isDarkMode ? "dark-theme" : "light-theme"}`} aria-label="login" name="login" placeholder="Login" required minLength={5} />
								</div>
								<div className={`mb-3`}>
									<input className={`shadow-sm form-control ${isDarkMode ? "dark-theme" : "light-theme"}`} aria-label="password" type="password" name="password" placeholder="Senha" required minLength={5} />
								</div>
								<div className={`mb-3 text-danger`} id="loginAlert">

								</div>
								<div className={`mb-5`}>
									<button className={`btn btn-dhodonto`} aria-label="submit" type="submit">Login</button>
								</div>
								<p className={`text-muted`}>Não tem uma conta? <Link to="/home">Cadastre-se
									<svg className={`icon icon-tabler icon-tabler-arrow-narrow-right`} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
										<line x1="5" y1="12" x2="19" y2="12"></line>
										<line x1="15" y1="16" x2="19" y2="12"></line>
										<line x1="15" y1="8" x2="19" y2="12"></line>
									</svg></Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default LoginForm;
