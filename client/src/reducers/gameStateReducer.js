
export const gameStateReducer = (state=false, action) => {
    switch(action.type) {
        case 'GAME_OVER':
            return state = !state
        default:
            return state
    }
}
