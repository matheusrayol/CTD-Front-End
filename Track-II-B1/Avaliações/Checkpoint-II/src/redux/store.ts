import {combineReducers} from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';

// Importamos applyMiddleware do Redux, para poder adicionar Thunk ou Saga como Middleware
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import {TypedUseSelectorHook, useSelector as useReduxSelector} from "react-redux";

// Importamos o thunk de redux-thunk
import thunk from 'redux-thunk';


const rootReducer = combineReducers({

});

export type IRootState = ReturnType<typeof rootReducer>;

// Tipamos o hook useSelector
export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector

export const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

export default store