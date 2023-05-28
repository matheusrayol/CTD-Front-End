export const setToggle = {
    TOGGLE_DARK_THEME: "TOGGLE_DARK_THEME",
    TOGGLE_LIGHT_THEME: "TOGGLE_LIGHT_THEME",
    DO_LOGIN: "DO_LOGIN",
    DO_LOGOUT: "DO_LOGOUT"
}

export const initialState = { theme: "light", login: !!localStorage.getItem("token") };

export const reducer = (state, action) =>{
    switch (action.type) {
        case setToggle.TOGGLE_DARK_THEME:
            return ({...state, theme: "dark"})
        case setToggle.TOGGLE_LIGHT_THEME:
            return  ({...state, theme: "light"})
        case setToggle.DO_LOGIN:
            return  ({...state, login: true})
        case setToggle.DO_LOGOUT:
            return  ({...state, login: false})
        default: {
            return state}
    }
}