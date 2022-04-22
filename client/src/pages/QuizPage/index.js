import React, { useEffect, useState } from 'react'
import { PlayerCard, QuestionCard } from '../../components'
import { Row, Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './index.css'
import { gameOver, incrementPlayerPoints } from '../../actions';
import { stepConnectorClasses } from '@mui/material';

export const QuizPage = () => {
    // Player state
    const players = useSelector(state => state.players)
    // Game state
    const gameState = useSelector(state => state.gameState)
    const timer = 3
    // Quiz settings
    const {
        question_category,
        question_difficulty,
        question_type,
        amount_of_questions,
    } = useSelector((state) => state.settingsReducer);

    const [questionsLeft, setQuestionsLeft] = useState([])
    const [questionToAnswer, setQuestionToAnswer] = useState('')
    const [answerData, setAnswerData] = useState([])
    const [partyReady, setPartyReady] = useState(false)
    const [displayTimer, setDisplayTimer] = useState(timer)
    const [currentPlayer, setCurrentPlayer] = useState(0)

    const dispatch = useDispatch()
    const redirect = useNavigate()

    // if (questionsLeft.length == 0) {
    //     return (
    //     <Box mt={20}>
    //         <CircularProgress />
    //     </Box>
    //     )
    // }

    // Randomises the position of the answers in an array.
    const answerRandomiser = (question) => {
        const answers = question['incorrect_answers'].concat([question['correct_answer']]);

        for (var i = answers.length - 1; i > 0; i--) {
            const randIndex = Math.floor(Math.random() * (i + 1))
            const temp = answers[i]
            answers[i] = answers[randIndex]
            answers[randIndex] = temp
        }
        return answers
    }

    // Fomats quiz data mixing correct and incorrect answers together while also removing other unecessary bits of info.
    const quizDataFormatter = (quizData) => {
        let formattedQuestionsList = [];
        let answersList = [];
        for (let i = 0; i < quizData.length; i++) {
            const qData = quizData[i]
            qData['id'] = i
            formattedQuestionsList.push({ 'id': qData['id'], 'question': qData['question'], "answers": answerRandomiser(qData) })
            answersList.push({ 'id': qData['id'], 'answers': qData['correct_answer'] })
        }
        setAnswerData(answersList)
        setQuestionsLeft(formattedQuestionsList)

    }
    // Calls data from third party quiz api
    const getQuestions = async (question_category, question_difficulty, question_type, amount_of_questions) => {
        try {
            let apiUrl = `/api.php?amount=${amount_of_questions}`;
            if (question_category) {
                apiUrl = apiUrl.concat(`&category=${question_category}`)
            }
            if (question_difficulty) {
                apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`)
            }
            if (question_type) {
                apiUrl = apiUrl.concat(`&type=${question_type}`)
            }
            const resp = await axios.get(`https://opentdb.com${apiUrl}`)
            quizDataFormatter(resp.data.results)
        } catch (err) {
            console.log(err)
        }
    }

    // Checks to see how many players are ready. if all are ready then question board is shown.
    const handlePartyReady = (players) => {
        let readyCounter = 0

        for (const player of players) {
            if (player.isReady) {
                readyCounter += 1
            }
        }
        if (readyCounter === players.length) {
            setPartyReady(true)
        }
    }

    const handleClickAnswer = () => {
        const correctAnswer = answerData.find(answer => answer.id === questionToAnswer.id);
        const player = players[currentPlayer]
            if (player.selectedAnswer === correctAnswer.answers) {
                console.log("score!: ", player.id)
                dispatch(incrementPlayerPoints(player.id))
            } else {
                console.log('oops')
            }

    };
    const nextQuestion = () => {
        console.log(`question:${questionToAnswer.id + 1}/${questionsLeft.length}`)
        console.log(`current player: ${currentPlayer + 1}/${players.length}`)
        if(questionToAnswer.id == questionsLeft.length -1){
            dispatch(gameOver())
        } else {
            if (currentPlayer < players.length -1) {
                setCurrentPlayer(currentPlayer + 1)
            } else {
                setCurrentPlayer(0)
            }
            setQuestionToAnswer(questionsLeft[questionToAnswer.id + 1])
        }
    }

    // Gets quiz data from api on load.
    useEffect(() => {
        getQuestions(question_category, question_difficulty, question_type, amount_of_questions)
        console.log('load')
    }, [])


    // checks if all players are ready 
    useEffect(() => {
        handlePartyReady(players)

        console.log('change to players state')

    }, [players])

    // Controls the timer for players turns, as well as moving onto the next question
    useEffect(()=>{
        if (!partyReady) {
            setQuestionToAnswer(questionsLeft[0])
        } else if (partyReady && displayTimer != 0) {
            const timer = setTimeout(()=> {
                setDisplayTimer(displayTimer - 1)
                console.log(displayTimer)
            }, 1000)
            return () => clearTimeout(timer)
        } else if (displayTimer === 0) {
            const dealWithResultsTimer = setTimeout(()=>{
                handleClickAnswer()
                nextQuestion()
                setDisplayTimer(timer)
            }, 5000)
            return ()=> clearTimeout(dealWithResultsTimer)
            
        }
        console.log('change state')
    })
    
    useEffect(()=>{
        console.log('change to game state')
        if (partyReady) {
            console.log('game over')
            redirect('/score')
        }
    },[gameState])

    return (
        <div className='section-background'>
            <section id='Quiz Page' className='container' >
                <h1 id="quiz-title">Quiz Wars</h1>
                <h2>Time left: {displayTimer}</h2>
                <Row>
                    <Col>
                        <Row xs={1} md={1}>
                            {players.map(playerData => (
                                <Col role={`PlayerElement_${playerData.name}`} key={playerData.id}>
                                    <PlayerCard player={playerData} partyReady={partyReady} currentPlayerId={currentPlayer} />
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    <Col role={'questionArea'}>
                        {partyReady && questionToAnswer ? <QuestionCard role={'questionCard'} question={questionToAnswer} currentPlayerId={currentPlayer}/> : <h2>ready up</h2>}
                    </Col>
                </Row>
            </section>
        </div>
    )
}
