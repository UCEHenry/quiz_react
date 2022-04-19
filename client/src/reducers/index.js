
import {combineReducers} from 'redux'
import { playerReducer } from './playerReducer'
import  settingsReducer from './settingsReducer'

export const allReducer = combineReducers({
    players:playerReducer,
    settingsReducer
})
