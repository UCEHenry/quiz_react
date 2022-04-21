/** @jest-environment jsdom */
import {screen} from '@testing-library/react';
import { PlayerCard } from '.';

describe('Player Card', () => {
    const player = { 'id': 0, 'name': 'TestName', 'points': 0, 'isReady': false, 'selectedAnswer':'' }
    let partyReady = false
    beforeEach(()=>{
        renderWithReduxProvider(<PlayerCard player={player} partyReady={partyReady}/>)
    })

    test('renders Player card with the player name "testName"',  () => {
        const pCardName = screen.getByText(/TestName/i)
        expect(pCardName).toBeInTheDocument();
    })

    test('Renders readyButton.', () => {
        const pCard = screen.getByRole(`playerReadyButton_${player.name}`)
        expect(pCard.textContent).toContain("Readyup")
    })

    test('Renders points on player card', () => {
        partyReady = true
        renderWithReduxProvider(<PlayerCard player={player} partyReady={partyReady}/>)
        const pCard = screen.getByRole(`playerScore_${player.name}`)
        expect(pCard.textContent).toContain("0")
    })


})
