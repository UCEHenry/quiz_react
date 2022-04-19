
import {combineReducers} from 'redux'
import { counterReducer } from './counterReducer'
import { readyButtonReducer } from './readyButtonReducer'
import { playerReducer } from './playerReducer'

export const allReducer = combineReducers({
    counter: counterReducer,
    readyButton: readyButtonReducer,
    players:playerReducer
})
