import { combineReducers } from 'redux';
import { characterReducer } from './characters.reducers';

const reducers = combineReducers({
  characters: characterReducer,
})

export default reducers;