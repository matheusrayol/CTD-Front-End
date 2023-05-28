import { render, screen } from "../../test.utils";
import { fireEvent } from "@testing-library/react";
import Login from '../../../Routes/Login';
import Home from '../../../Routes/Home';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';
import ScheduleFormModal from "../../../Components/ScheduleFormModal";


test('A Página inicial é carregada corretamente', () => {
    render(<Home />);
    expect(screen.getByText('Home')).toBeInTheDocument();
});

test('A página de Login é carregada corretamente', () => {
    render(<Login />)
    expect(screen.getByText('Login')).toBeInTheDocument();
});

test('A Navbar é carregada corretamente', () => {
    render(<Navbar />)
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
});

test('O Footer é carregado corretamente', () => {
    render(<Footer />)
    expect(screen.getByText('Matheus Rayol Ferreira')).toBeInTheDocument();
});

test('O formulário para marcar consultas é carregado corretamente', () => {
    render(<ScheduleFormModal />)
    expect(screen.getByText('Marcar consulta')).toBeInTheDocument();
});

test('Fazer login com um usuário válido', () => {
    render(<Login />);
    const inputLogin = screen.getByLabelText('login');
    const inputPassword = screen.getByLabelText('password');
    const submitButton = screen.getByLabelText('submit');

    fireEvent.change(inputLogin, { target: { value: 'dentistaAdmin' } });
    fireEvent.change(inputPassword, { target: { value: 'admin123' } });
    fireEvent.click(submitButton);

    setTimeout(() => {

        expect(screen.getByText('Home')).toBeInTheDocument()

    }, 2000)
});

test('Fazer login com um usuário inválido', () => {
    render(<Login />);
    const inputLogin = screen.getByLabelText('login');
    const inputPassword = screen.getByLabelText('password');
    const submitButton = screen.getByLabelText('submit');

    fireEvent.change(inputLogin, { target: { value: 'dentistaAdmin' } });
    fireEvent.change(inputPassword, { target: { value: 'admin1234' } });
    fireEvent.click(submitButton);

    setTimeout(() => {
        expect(screen.getByText('Verifique os dados informados e tente novamente.')).toBeInTheDocument()
    }, 2000)
});

test('Exibir os detalhes do primeiro Card de dentista', () => {
    render(<Login />);
    const inputLogin = screen.getByLabelText('login');
    const inputPassword = screen.getByLabelText('password');
    const submitButton = screen.getByLabelText('submit');

    fireEvent.change(inputLogin, { target: { value: 'dentistaAdmin' } });
    fireEvent.change(inputPassword, { target: { value: 'admin123' } });
    fireEvent.click(submitButton);

    setTimeout(() => {
        expect(screen.getByText('Home')).toBeInTheDocument()
    }, 2000)

    const dentistaCardButton = screen.getAllByRole('button')[0];
    fireEvent.click(dentistaCardButton);

    setTimeout(() => {
        expect(screen.getByText('Usuário')).toBeInTheDocument()
    }, 2000)

});