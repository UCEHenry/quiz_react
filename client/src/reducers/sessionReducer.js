const initState = {'startGame': false}

export const sessionReducer = (state = initState, action) => {
    switch(action.type) {
        case 'TOGGLE_SESSION_READY':
            

            return !state
        default:
            return state
    }
}
