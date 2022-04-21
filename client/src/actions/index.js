import {
    CHANGE_CATEGORY,
    CHANGE_DIFFICULTY,
    CHANGE_TYPE,
    CHANGE_AMOUNT,
    CHANGE_SCORE
} from './actionTypes'

export const handleCategoryChange = payload => ({
    type: CHANGE_CATEGORY,
    payload,
});

export const handleDifficultyChange = payload => ({
    type: CHANGE_DIFFICULTY,
    payload,
});

export const handleTypeChange = payload => ({
    type: CHANGE_TYPE,
    payload,
});

export const handleAmountChange = payload => ({
    type: CHANGE_AMOUNT,
    payload,
});

export const handleScoreChange = payload => ({
    type: CHANGE_SCORE,
    payload,
});

export const togglePlayerReady = playerId => ({type: 'TOGGLE_READY', payload: playerId})
export const incrementPlayerPoints = playerId => ({type: 'INCREMENT_PLAYER_POINT', payload: playerId})
export const selectAnswer = (playerId, answer) => ({type: 'SELECT_ANSWER', payload: playerId, answer:answer})
export const playerAnswered = () => ({type:'PLAYER_ANSWERED'})
