/** @jest-environment jsdom */
import {screen, queryAllByAttribute} from '@testing-library/react';
import { PlayerCard } from '.';

describe('Player Card', () => {
    const player = {'name': 'TestName', 'points': 0}
    beforeEach(()=>{
        render(<PlayerCard player={player}/>)
    })

    test('renders Player card with the player name "testName"',  () => {
        const pCard = screen.getByText(/TestName/i)
        console.log(pCard)
        expect(pCard).toBeInTheDocument();
    })

})
