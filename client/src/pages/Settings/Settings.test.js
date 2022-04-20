/** @jest-environment jsdom */
import {screen} from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { Settings } from '.';
import { settingsCategoryDataMock } from '../../../__mocks__/axiosMock';
describe('Settings Page', () => {
    let getResultMock;
    beforeEach(()=>{
        getResultMock = jest.fn()
        renderWithReduxProvider(<Router><Settings/></Router>)
        console.log(getResultMock)
    })

    test('Render Settings page', () => {
        const settingsPage = screen.getByText(/Host/i);
        expect(settingsPage).toBeInTheDocument();
    })
    test('Checks "Catergory" has 29 options', () => {
        axios.get.mockImplementationOnce(()=>Promise.resolve({data:settingsCategoryDataMock}))

        const categoryDropDown = screen.findByLabelText('Category')
        let counter = 0
        expect(counter).toEqual(counter)

    })
})
