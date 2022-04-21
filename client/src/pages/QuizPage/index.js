import React, { useEffect, useState } from 'react'
import { PlayerCard, QuestionCard } from '../../components'
import { Row, Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { gameOver, incrementPlayerPoints } from '../../actions';

export const QuizPage = () => {
    // Player state
    const players = useSelector(state => state.players)
    // Game state
    const gameState = useSelector(state => state.gameState)

    // Quiz settings
    const {
        question_category,
        question_difficulty,
        question_type,
        amount_of_questions,
        score
    } = useSelector((state) => state.settingsReducer);

    const [questionsLeft, setQuestionsLeft] = useState([])
    const [questionToAnswer, setQuestionToAnswer] = useState('')
    const [answerData, setAnswerData] = useState([])
    const [partyReady, setPartyReady] = useState(false)
    const [displayTimer, setDisplayTimer] = useState(5)

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
        for (const player of players) {
            if (player.selectedAnswer === correctAnswer.answers) {
                console.log("score!: ", player.id)
                dispatch(incrementPlayerPoints(player.id))
            } else {
                console.log('oops')
            }
        }
    };
    const nextQuestion = () => {
        console.log('question to answer id:', questionToAnswer.id)
        console.log('question lefts:', questionsLeft.length -1)
        if(questionToAnswer.id == questionsLeft.length -1){

            dispatch(gameOver())
        } else {
            setQuestionToAnswer(questionsLeft[questionToAnswer.id + 1])
        }
    }

    const countdown = () => {
        if (partyReady) {
            const timer = setTimeout(()=> {
                handleClickAnswer()
                setDisplayTimer(displayTimer - 1)
                console.log(displayTimer)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }

    // Gets quiz data from api on load.
    useEffect(() => {
        getQuestions(question_category, question_difficulty, question_type, amount_of_questions)       
        console.log('load')
    }, [])


    // checks if all players are ready // TODO currently this also deals with checking if player has chosen an answer however this also changes the question everytime a button is pressed. not good.
    useEffect(() => {
        handlePartyReady(players)
        
        console.log('change to players state')
        
    }, [players])

    useEffect(()=>{
        if (!partyReady) {
            setQuestionToAnswer(questionsLeft[0])
        } else if (partyReady && displayTimer != 0) {
            const timer = setTimeout(()=> {
                // handleClickAnswer()
                setDisplayTimer(displayTimer - 1)
                console.log(displayTimer)
            }, 1000)
            return () => clearTimeout(timer)
        } else if (displayTimer === 0) {
            // handleClickAnswer()
            const dealWithResultsTimer = setTimeout(()=>{
                handleClickAnswer()
                nextQuestion()
                setDisplayTimer(5)
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
        <section id='Quiz Page' className='container' >
            <h1>quiz page</h1>
            <h2>Time left: {displayTimer}</h2>
            <Row>
                <Col>
                    <Row xs={1} md={1}>
                        {players.map(playerData => (
                            <Col role={`PlayerElement_${playerData.name}`} key={playerData.id}>
                                <PlayerCard player={playerData} partyReady={partyReady} />
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col role={'questionArea'}>
                    {partyReady && questionToAnswer ? <QuestionCard role={'questionCard'} question={questionToAnswer} /> : <h2>ready up</h2>}
                </Col>

            

            </Row>
        </section>
    )
}
