/** @jest-environment jsdom */
import {screen} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Settings } from '.';

describe('Settings Page', () => {
    let getResultMock;
    beforeEach(()=>{
        getResultMock = jest.fn()
        renderWithReduxProvider(<Router><Settings/></Router>)
        console.log(getResultMock)
    })

    test('Render Settings page', () => {
        const settingsPage = screen.getByText(/Host Settings/i);
        expect(settingsPage).toBeInTheDocument();
    })
    test('Checks "Catergory" has 24 options', () => {
        const categoryDropDown = screen.findByLabelText('Category')
        const 

    })
})
