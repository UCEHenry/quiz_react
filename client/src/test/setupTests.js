/** @jest-environment jsdom */
import React from 'react';

import { settingsCategoryDataMock, quizData } from '../../__mocks__/axiosMockData';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import playerReducer from '../reducers/playerReducer'
import {allReducer} from '../reducers'


const TestProviders = ({ initState }) => {
    const testStore = createStore(allReducer, applyMiddleware(thunk))

    return ({ children }) => (
        <Router>
        <Provider store={testStore}>
            { children }
        </Provider>
        </Router>

    )
}

const renderWithReduxProvider = (ui, options={}) => {
    let TestWrapper = TestProviders(options)
    render(ui, { wrapper: TestWrapper, ...options })
}

import axios from 'axios';
jest.mock('axios')
axios.get.mockResolvedValue({data:{}})

global.renderWithReduxProvider = renderWithReduxProvider
global.React = React;
global.render = render;

