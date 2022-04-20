/** @jest-environment jsdom */
import { screen, cleanup, waitFor, getByRole, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QuizPage } from '.';
import { act } from 'react-dom/test-utils';
import axiosMock from 'axios'
import quizData from '../../../__mocks__/mockData.json'

describe('Quiz Page', () => {

    beforeEach(() => {
        delete window.location
        window.location = new URL('http://localhost/');
        const initState = {
            players: [
                {
                    id: 0,
                    name: 'Idris',
                    points: 0,
                    isReady: true,
                    selectedAnswer: ''
                },
            ],
            settingsReducer: {
                question_category: '',
                question_difficulty: '',
                question_type: '',
                amount_of_questions: 50,
                score: 0
            }
        };
        axiosMock.get.mockResolvedValueOnce(quizData)

    })
    afterEach(cleanup)

    test('Checks Quiz API has been called',  () => {
        const initState = {
            players: [
                {
                    id: 0,
                    name: 'Idris',
                    points: 0,
                    isReady: true,
                    selectedAnswer: ''
                },
            ],
            settingsReducer: {
                question_category: '',
                question_difficulty: '',
                question_type: '',
                amount_of_questions: 50,
                score: 0
            }
        };
        renderWithReduxProvider(<QuizPage />, { initState })
        expect(axiosMock.get).toHaveBeenCalledTimes(1)
    })

    test('Render initial quiz page', async () => {
        const initState = {
            players: [
                {
                    id: 0,
                    name: 'Idris',
                    points: 0,
                    isReady: true,
                    selectedAnswer: ''
                },
            ],
            settingsReducer: {
                question_category: '',
                question_difficulty: '',
                question_type: '',
                amount_of_questions: 50,
                score: 0
            }
        };
        // axiosMock.get.mockResolvedValueOnce(quizData)
        renderWithReduxProvider(<QuizPage />, { initState })
        const quizPage = screen.getByText(/quiz page/i);
        expect(quizPage).toBeInTheDocument();
    })

    test('Render Quiz ready up notification', async () => {
        const initState = {
            players: [
                {
                    id: 0,
                    name: 'Idris',
                    points: 0,
                    isReady: true,
                    selectedAnswer: ''
                },
            ],
            settingsReducer: {
                question_category: '',
                question_difficulty: '',
                question_type: '',
                amount_of_questions: 50,
                score: 0
            }
        };
        // axiosMock.get.mockResolvedValueOnce(quizData)
        renderWithReduxProvider(<QuizPage />, { initState })
        const questionArea = await waitFor(() => screen.getByRole('questionArea'))
        expect(questionArea).toHaveTextContent('ready up')

    })

    test('quizCard displays questions', async() => {
        const initState = {
            players: [
                {
                    id: 0,
                    name: 'Idris',
                    points: 0,
                    isReady: true,
                    selectedAnswer: ''
                },
            ],
            settingsReducer: {
                question_category: '',
                question_difficulty: '',
                question_type: '',
                amount_of_questions: 50,
                score: 0
            }
        };
        // initState.players[0].isReady = false
        renderWithReduxProvider(<QuizPage />, { initState })
        fireEvent.click(screen.getByRole(`PlayerElement_${initState.players[0].name}`))
        const questionCard = await waitFor(() => screen.getByRole('questionCard'))
        questionCard.toHaveTextContent('"Talos, the mythical giant bronze man, was the protector of which island?')
    })

})
