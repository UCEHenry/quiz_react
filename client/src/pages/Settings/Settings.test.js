/** @jest-environment jsdom */
import {screen} from '@testing-library/react';
import axiosMock from 'axios';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Settings } from '.';
import triviaData from '../../../__mocks__/mockSettingsData'
describe('Settings Page', () => {
    // let getResultMock;
    // beforeEach( ()=>{
    //     getResultMock = jest.fn()
    //     renderWithReduxProvider(<Router><Settings/></Router>)
    //     // console.log(getResultMock)
    // })

    test('Render Settings page', () => {
        // let initState = {players: [],   settingsReducer: {
        //     question_category: '',
        //     question_difficulty: '',
        //     question_type: '',
        //     amount_of_questions: 50,
        //     score: 0
        //   }}
        // renderWithReduxProvider(<Router><Settings/></Router>, {initState})
        // const settingsPage = screen.getByText(/Host/i);
        // expect(settingsPage).toBeInTheDocument();
    })
    test('Checks "Catergory" has 29 options', async () => {
        axiosMock.get.mockResolvedValueOnce({data:triviaData})

        renderWithReduxProvider(<Settings/>)

        const categoryDropDown = await waitFor(()=>screen.findByLabelText('Category'))
        console.log(categoryDropDown)
        // expect(counter).toEqual(counter)

    })
})
