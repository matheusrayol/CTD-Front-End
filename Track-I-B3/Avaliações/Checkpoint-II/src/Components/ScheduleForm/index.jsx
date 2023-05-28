import { useContext, useEffect, useState } from "react";
import { render } from "react-dom";
import { GlobalContext } from "../../Contexts/GlobalContext";
import { retrieveToken } from "../../Services/localStorage";

const ScheduleForm = () => {

	const [dentists, setDentists] = useState([]);
	const [patients, setPatients] = useState([]);
	const { theme } = useContext(GlobalContext);
	const isDarkMode = theme === "dark" || false;

	useEffect(() => {
		async function fetchData() {
			try {
				const [dentist, patient] = await Promise.all([
					fetch(`https://dhodonto.ctdprojetos.com.br/dentista`),
					fetch(`https://dhodonto.ctdprojetos.com.br/paciente`),
				]);
				const dentists = await dentist.json();
				const patients = await patient.json();
				setDentists(dentists);
				setPatients(patients.body);
			} catch (error) {
				console.error(error.message);
			}
		}
		fetchData();
	}, []);


	const handleSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		const token = retrieveToken();

		try {
			fetch("https://dhodonto.ctdprojetos.com.br/consulta", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					dentista: {
						matricula: data.dentist,
					},
					paciente: {
						matricula: data.patient,
					},
					dataHoraAgendamento: data.appointmentDate,
				}),
			})
				.then((response) => {
					if (response.ok) {
						render(<span style={{color: "blueviolet"}}>Consulta marcada com sucesso!</span>, document.getElementById("appointmentAlert"))
						setTimeout(() => {
							window.location.href="/";
						}, 10000)
					} else {
						render(<span style={{color: "red"}}>Ocorreu um erro ao marcar a consulta. Tente novamente.</span>, document.getElementById("appointmentAlert"))
					}
				});
		} catch (error) {
			console.error(error.message);
		}

	};

	return (
		<>
			<form onSubmit={handleSubmit} className={isDarkMode ? "dark-theme" : "light-theme"}>
				<div className={`row`}>
					<div className={`col`}>
						<p className={`text-center`}>Selecione o Dentista, o Paciente, a data e a hora para a consulta.</p>
					</div>
				</div>
				<div className={`row pb-3`}>
					<div className={`col-sm-12 col-lg-6`}>
						<label className={`form-label`} htmlFor="dentist">Dentista</label>
						<select className="form-select" name="dentist" id="dentist">
							{
								dentists.length > 0 && dentists.map((dentist) => (
									<option key={dentist.matricula} value={dentist.matricula}>{dentist.nome} {dentist.sobrenome}</option>
								))
							}
						</select>
					</div>
					<div className={`col-sm-12 col-lg-6`}>
						<label className={`form-label`} htmlFor="patient">Paciente</label>
						<select className="form-select" name="patient" id="patient">
							{
								patients.length > 0 && patients.map((patient) => (
									<option key={patient.matricula} value={patient.matricula}>{patient.nome} {patient.sobrenome}</option>
								))
							}
						</select>
					</div>
				</div>
				<div className={`row`}>
					<div className={`col pb-3`}>
						<label className={`form-label`} htmlFor="appointmentDate">Data / Hora da consulta</label>
						<input className={`form-control`} aria-label="appointmentDate" id="appointmentDate" name="appointmentDate" type="datetime-local" />
					</div>
				</div>
				<div className={`d-flex justify-content-center pb-3`} id="appointmentAlert">

				</div>
				<div className={`d-flex justify-content-end`}>
					<button className={`btn btn-dhodonto`} data-testid="setAppointment" type="submit">Marcar consulta</button>
				</div>
			</form>
		</>
	);
};

export default ScheduleForm;
