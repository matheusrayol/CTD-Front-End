import { createContext, useMemo, useReducer } from 'react';
import { setToggle, initialState, reducer } from '../Modules/Reducer';

// Cria novo contexto global com o estado inicial do app.
export const GlobalContext = createContext(undefined);

// Recebe o estado inicial e retorna um reducer, criando um objeto com 2 propriedades: theme e login.
export const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Seta funções para alterar o estado do app (cor do tema e login)
    const providerState = useMemo(
        () => ({
            theme: state.theme,
            login: state.login,
            toggleDarkTheme: () => dispatch({ type: setToggle.TOGGLE_DARK_THEME }),
            toggleLightTheme: () => dispatch({ type: setToggle.TOGGLE_LIGHT_THEME }),
            doLogin: () => dispatch({ type: setToggle.DO_LOGIN }),
            doLogout: () => dispatch({ type: setToggle.DO_LOGOUT })
        }),
        [state.login, state.theme]
    );

    // Retorna o GlobalContextProvider com um array de childrens do app.
    return (
        <GlobalContext.Provider value={providerState}>
            {children}
        </GlobalContext.Provider>
    );

};