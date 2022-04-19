import React, { useEffect, useState } from 'react'
import { PlayerCard, QuestionCard } from '../../components'
import { CardGroup, Row, Col, Container } from 'react-bootstrap'
import quizDataResp from '../../assets/testData/questions.json'
import { useSelector, useDispatch } from 'react-redux';
import { Button, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { decode } from "html-entities"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { incrementPlayerPoints } from '../../actions';

export const QuizPage = () => {
    // Player state
    const players = useSelector(state => state.players)

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
    const dispatch = useDispatch()

    // Fomats quiz data mixing correct and incorrect answers together while also removing other unecessary bits of info.
    const quizDataFormatter = (quizData) => {
        let formattedQuestionsList = [];
        let answersList = [];
        for (let i = 0; i< quizData.length; i++) {
            const qData = quizData[i]
            qData['id'] = i
            formattedQuestionsList.push({'id': qData['id'],'question':qData['question'], "answers": answerRandomiser(qData)})
            answersList.push({'id':qData['id'], 'answers': qData['correct_answer']})
        }
        setAnswerData(answersList)
        setQuestionsLeft(formattedQuestionsList)

    }
    // Calls data from third party quiz api
    const getQuestions = async (question_category, question_difficulty, question_type, amount_of_questions) => {
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
    }

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
    // Gets quiz data from api on load.
    useEffect(() => {
        getQuestions(question_category, question_difficulty, question_type, amount_of_questions)

    }, [])
    // checks if all players are ready // TODO currently this also deals with checking if player has chosen an answer however this also changes the question everytime a button is pressed. not good.
    useEffect(()=>{
        handlePartyReady(players)
        if(partyReady) {
            handleClickAnswer()
            const randQuestIdx = Math.floor(Math.random() * questionsLeft.length + 1 )
            setQuestionToAnswer(questionsLeft[randQuestIdx])
            // console.log(questionToAnswer)
        } else {
            setQuestionToAnswer(questionsLeft[0])
        }
    }, [players])

    // if (loading) {
    //     <Box mt={20}>
    //         <CircularProgress />
    //     </Box>
    // }

    const handleClickAnswer = () => {
        const correctAnswer = answerData.find(answer => answer.id === questionToAnswer.id);

        console.log(correctAnswer.answers)
        console.log(players[0].selectedAnswer)
        for (const player of players) {
            if (player.selectedAnswer === correctAnswer.answers) {
                console.log("score!: ", player.id)
                dispatch(incrementPlayerPoints(player.id))
            } else {
                console.log('oops')
            }
        }
    };

    return (
        <section id='Quiz Page' className='container' >
            <h1>quiz page</h1>
            <Row>
                <Col>
                    <Row xs={1} md={1}>
                        {players.map(playerData => (
                            <Col key={playerData.id}>
                                <PlayerCard player={playerData} partyReady={partyReady} />
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col>
                    {partyReady ? <QuestionCard  question={questionToAnswer}/>: <h2>ready up</h2>}
                </Col>

            </Row>
        </section>
    )
}
