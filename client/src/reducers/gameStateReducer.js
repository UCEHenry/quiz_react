
export const gameStateReducer = (state=0, action) => {
    switch(action.type) {
        case 'PLAYER_ANSWERED':
            return state + 1
        default:
            return state
    }
}
