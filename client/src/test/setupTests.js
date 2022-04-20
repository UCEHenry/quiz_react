/** @jest-environment jsdom */
import React from 'react';
import { settingsCategoryDataMock } from '../../__mocks__/axiosMock';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import playerReducer from '../reducers/playerReducer'
import {allReducer} from '../reducers'


const TestProviders = ({ initState }) => {
    // initState ||= [{ 'id': 0, 'name': 'Idris', 'points': 0, 'isReady': false, 'selectedAnswer':'' }];
    // let testReducer = () => playerReducer(initState, { type: '@@INIT' })
    const testStore = createStore(allReducer, applyMiddleware(thunk))

    return ({ children }) => (
        <Provider store={testStore}>
            { children }
        </Provider>
    )
}

const renderWithReduxProvider = (ui, options={}) => {
    let TestWrapper = TestProviders(options)
    render(ui, { wrapper: TestWrapper, ...options })
}

import axios from 'axios';
jest.mock('axios')
axios.get.mockResolvedValue({ data: settingsCategoryDataMock, status: 200, statusText: 'OK',headers: {},config: {},})

global.renderWithReduxProvider = renderWithReduxProvider
global.React = React;
global.render = render;

