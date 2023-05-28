import { useContext } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';
import ScheduleForm from '../ScheduleForm';
import styles from './styles.module.css';

const ScheduleFormModal = () => {
	const { theme } = useContext(GlobalContext);
	const isDarkMode = theme === "dark" || false;

	return (
		<div className={`modal fade`} id="makeAppointment" tabIndex="-1" aria-labelledby="makeAppointmentLabel" aria-hidden="true" role="dialog">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className={`modal-content ${isDarkMode ? "dark-theme" : "light-theme"}`}>
					<div className="modal-header border-0">
						<h1 className="modal-title fs-5" id="makeAppointmentLabel">DH Odonto - Marcar consulta</h1>
						<button type="button" className={`btn-close ${isDarkMode ? styles.filterDark : ""}`} data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<ScheduleForm />
					</div>
				</div>
			</div>
		</div >

	);
};

export default ScheduleFormModal;
