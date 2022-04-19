const initState = [{ 'id': 0, 'name': 'Idris', 'points': 0, 'isReady': false }, { 'id': 1, 'name': 'Paul', 'points': 0, 'isReady': false }, { 'id': 2, 'name': 'Henry', 'points': 0, 'isReady': false }, { 'id': 3, 'name': 'Marco', 'points': 0, 'isReady': false }]


export const playerReducer = (state=initState, action) => {
    switch(action.type) {
        case 'TOGGLE_READY':
            const playerToToggle = state.find(p => p.id ===action.payload)
            const playerListIndex = state.indexOf(playerToToggle)
            const updatePlayerReady = [
                ...state.slice(0, playerListIndex),
                {...playerToToggle, isReady: !playerToToggle.isReady},
                ...state.slice(playerListIndex+1)
            ]
            return state = updatePlayerReady
        default:
            return state
    }

}
