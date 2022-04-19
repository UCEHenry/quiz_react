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

export const QuizPage = () => {
    // const [players, setPlayers] = useState([{ 'id': 0, 'name': 'Idris', 'points': 0, 'isReady': false }, { 'id': 1, 'name': 'Paul', 'points': 0, 'isReady': false }, { 'id': 2, 'name': 'Henry', 'points': 0, 'isReady': false }, { 'id': 3, 'name': 'Marco', 'points': 0, 'isReady': false }])
    const players = useSelector(state => state.players)
    const {
        question_category,
        question_difficulty,
        question_type,
        amount_of_questions,
        score
    } = useSelector((state) => state.settingsReducer);
    const [questionsLeft, setQuestionsLeft] = useState([])
    const [questionToAnswer, setQuestionToAnswer] = useState('')

    const [partyReady, setPartyReady] = useState(false)
    const sessionState = useSelector(state => state.sessionState)

    const quizDataFormatter = (quizData) => {
        let formattedQuestionsList = [];
        for (let i = 0; i< quizData.length; i++) {
            const qData = quizData[i]
            qData['id'] = i
            formattedQuestionsList.push({'id': qData['id'],'question':qData['question'], "answers": answerRandomiser(qData)})
        }
        setQuestionsLeft(formattedQuestionsList)

    }

    // const {
    //     question_category,
    //     question_difficulty,
    //     question_type,
    //     amount_of_questions,
    //     score
    // } = useSelector((state) => state.settingsReducer);
    // console.log(question_category)
    // const history = useNavigate();
    // const dispatch = useDispatch();

    // let apiUrl = `/api.php?amount=${amount_of_questions}`;
    // if (question_category) {
    //     apiUrl = apiUrl.concat(`&category=${question_category}`)
    // }
    // if (question_difficulty) {
    //     apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`)
    // }
    // if (question_type) {
    //     apiUrl = apiUrl.concat(`&type=${question_type}`)
    // }

    // const { response, loading } = useAxios({ url: apiUrl });
    // const [questionIndex, setQuestionIndex] = useState(0);
    // const [options, setOptions] = useState([]);

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
        // const { response, loading } = useAxios({ url: apiUrl });
        
    }

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

    // const answerCheck = (questionId, playerAnswer, quizData) => {
    //     const correctAnswer = quizData.find((item) => item['id'] === questionId)['correct_answer']
    //     if (playerAnswer === correctAnswer) {
    //         console.log("1 point")
    //     } else {
    //         console.log("-1 point")
    //     }
    // }
    const questionRandomiser = (questionsList) => {
        for (let i=questionsList.length -1; i> 0; i--) {
            const randIdx = Math.floor(Math.random()* (i+1))
            const temp = questionsList[i]
            questionsList[i] = questionsList[randIdx]
            questionsList[randIdx] = temp
        }
        console.log(questionsList)
    }

    const handlePartyReady = (players) => {
        let readyCounter = 0
        console.log(players)
        for (const player of players) {
            if (player.isReady) {
                readyCounter += 1
                console.log('ready')
            }
        }
        console.log('ready count: ',readyCounter)
        if (readyCounter === players.length) {
            setPartyReady(true)
        }
        // setPartyReady(true)
    }

    useEffect(() => {
        // quizDataFormatter(quizDataResp)
        handlePartyReady(players)
        console.log('use effect happened')
        getQuestions(question_category, question_difficulty, question_type, amount_of_questions)
        // if (questionsLeft.length) {
        //     if (response?.results.length) {
        //         const question = response.results[questionIndex];
        //         let answers = [...question.incorrect_answers];
        //         answers.splice(
        //             getRandomInt(question.incorrect_answer.length),
        //             0,
        //             question.correct_answer
        //         );
        //         console.log(question)
        //         setOptions(answers);
        //     }
        // }
    }, [players])

    // if (loading) {
    //     <Box mt={20}>
    //         <CircularProgress />
    //     </Box>
    // }

    const handleClickAnswer = (e) => {
        const question = response.results[questionIndex];
        if (e.target.textContent === question.correct_answer) {
            dispatch(handleScoreChange(score + 1));
        }
        if (questionIndex + 1 < response.results.length) {
            setQuestionIndex(questionIndex + 1);
        } else {
            this.prop.history.push('/score')
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
                    {partyReady ? <QuestionCard  question={decode(questionsLeft[0])}/>: <h2>ready up</h2>}
                </Col>

            </Row>
            <Button onClick={handlePartyReady}>test readyup</Button>
        </section>
    )
}
