export const increment = () => {
    return {
        type: 'Increment'
    }
}


export const decrement = () => {
    return {
        type: 'Decrement'
    }
}

export const togglePlayerReady = playerId => ({type: 'TOGGLE_READY', payload: playerId})
