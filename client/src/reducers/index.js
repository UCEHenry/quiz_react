
import {combineReducers} from 'redux'
import { playerReducer } from './playerReducer'
import  settingsReducer from './settingsReducer'
import { sessionReducer } from './sessionReducer'

export const allReducer = combineReducers({
    players:playerReducer,
    settingsReducer,
    sessionState: sessionReducer
})
