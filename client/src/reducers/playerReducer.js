const initState = [{ 'id': 0, 'name': 'Idris', 'points': 0, 'isReady': false, 'selectedAnswer':'' }, { 'id': 1, 'name': 'Paul', 'points': 0, 'isReady': false, 'selectedAnswer':''  }, { 'id': 2, 'name': 'Henry', 'points': 0, 'isReady': false, 'selectedAnswer':''  }, { 'id': 3, 'name': 'Marco', 'points': 0, 'isReady': false, 'selectedAnswer':''}]


export const playerReducer = (state=initState, action) => {

    const playerTo = (state, action) => {
        const playerTofind = state.find(p => p.id === action.payload)
        const playerListIndex = state.indexOf(playerTofind)
        return [playerTofind, playerListIndex]
    }

    switch(action.type) {
        case 'TOGGLE_READY':
            const playerToToggle = playerTo(state, action)
            const updatePlayerReady = [
                ...state.slice(0, playerToToggle[1]),
                {...playerToToggle[0], isReady: !playerToToggle[0].isReady},
                ...state.slice(playerToToggle[1]+1)
            ]
            return state = updatePlayerReady
        case 'INCREMENT_PLAYER_POINT':
            const playerToIncrement = playerTo(state, action)
            console.log(action)
            const updatePlayerPoints = [
                ...state.slice(0, playerToIncrement[1]),
                {...playerToIncrement[0], points: playerToIncrement[0].points ++},
                ...state.slice(playerToIncrement[1]+1)
            ]
            return state = updatePlayerPoints
        case 'SELECT_ANSWER':
            const playerToSelectAnswer = playerTo(state, action)
            const updateSelectedAnswer = [
                ...state.slice(0, playerToSelectAnswer[1]),
                {...playerToSelectAnswer[0], selectedAnswer: playerToSelectAnswer[0].selectedAnswer = action.answer},
                ...state.slice(playerToSelectAnswer[1]+1)
            ]
            return state = updateSelectedAnswer
        default:
            return state
    }
    

}
