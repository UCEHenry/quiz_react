/** @jest-environment jsdom */
import { screen, cleanup, waitFor, getByRole, fireEvent } from '@testing-library/react';
import {FinalPage} from '.'
import scoreData from '../../../__mocks__/mockFinalScore.json'
describe('Final Score Page', () => {

    test('Checks Final API has been called',  () => {
        axiosMock.get.mockResolvedValueOnce({data: scoreData})
        renderWithReduxProvider(<FinalPage />)
        expect(axiosMock.get).toHaveBeenCalledTimes(1)
    })

    test('Render  Final page', async () => {
        renderWithReduxProvider(<FinalPage />)
        const quizPage = screen.getByText(/Final Score/i);
        expect(quizPage).toBeInTheDocument();
    })

    test('Render items in right order', async ()=> {
        axiosMock.get.mockResolvedValueOnce({data: scoreData})
        
    })

})
