
import {combineReducers} from 'redux'
import { playerReducer } from './playerReducer'
import { gameStateReducer } from './gameStateReducer'
import  settingsReducer from './settingsReducer'


export const allReducer = combineReducers({
    players:playerReducer,
    settingsReducer,
    gameState: gameStateReducer
})
