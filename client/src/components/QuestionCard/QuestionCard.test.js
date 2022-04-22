import { screen, cleanup, waitFor, getByRole, fireEvent } from '@testing-library/react';
import {QuestionCard} from '.'
describe('Quiz Page', () => {
    const Prop = {
        question:{
            "id":0,"question":"In what year did Neil Armstrong and Buzz Aldrin land on the moon?","answers":["1966", "1973", "1965", "1969"]}, currentPlayerId : 0
    };
    beforeEach(() => {


    })
    afterEach(cleanup)

    test('Renders question card',  () => {
        renderWithReduxProvider(<QuestionCard />, { Prop })
        const settingsPage = screen.getByText(/Question 1:/i);
        expect(settingsPage).toBeInTheDocument();

    })


})
