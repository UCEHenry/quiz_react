const initState = {
    isReady: false
}

export const readyButtonReducer = (state=initState, action) => {
    switch(action.type) {
        case 'READY':
            return state.isReady = true
        case 'NOT_READY':
            return state.isReady = false
        default:
            return state
    }

}
