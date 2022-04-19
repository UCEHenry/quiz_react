import React, { useEffect, useState } from 'react'
import { PlayerCard, QuestionCard } from '../../components'
import { CardGroup, Row, Col, Container, Button } from 'react-bootstrap'
import quizDataResp from '../../assets/testData/questions.json'
import axios from 'axios'

export const QuizPage = () => {
    const [players, setPlayers] = useState([{ 'id': 0, 'name': 'Idris', 'points': 0, 'isReady': false }, { 'id': 1, 'name': 'Paul', 'points': 0, 'isReady': false }, { 'id': 2, 'name': 'Henry', 'points': 0, 'isReady': false }, { 'id': 3, 'name': 'Marco', 'points': 0, 'isReady': false }])
    const [questionsLeft, setQuestionsLeft] = useState([])
    const [questionToAnswer, setQuestionToAnswer] = useState('')
    const [paryReady, setPartyReady] = useState(false)
    
    
    const quizDataFormatter = (quizData) => {
        let formattedQuestionsList = [];
        for (let i = 0; i< quizData['results'].length; i++) {
            const qData = quizData['results'][i]
            qData['id'] = i
            formattedQuestionsList.push({'id': qData['id'],'question':qData['question'], "answers": answerRandomiser(qData)})
        }
        setQuestionsLeft(formattedQuestionsList)
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

    const handlePartyReady = () => {
        // const readyCounter = 0
        // for (const player of players) {
        //     if (player.isReady) {
        //         readyCounter ++
        //     }
        // }
        // if (readyCounter === players.length) {
        //     setPartyReady(true)
        // }
        setPartyReady(true)
    }


    useEffect(() => {
        quizDataFormatter(quizDataResp)
    }, [])

    return (
        <section id='Quiz Page' className='container' >
            <h1>quiz page</h1>
            <Row>
            <Col>
            <Row xs={1} md={1}>
                {players.map(playerData => (
                    <Col  key={playerData.id}>
                        <PlayerCard player={playerData} />
                    </Col>
                ))}
            </Row>
            </Col>

            <Col>
                {paryReady ? <QuestionCard  question={questionsLeft[0]}/>: <h2>ready up</h2>}
            </Col>

            </Row>
            <Button onClick={handlePartyReady}>test readyup</Button>
        </section>
    )
}
