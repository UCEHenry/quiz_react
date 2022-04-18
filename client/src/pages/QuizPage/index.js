import React, { useEffect, useState } from 'react'
import { PlayerCard, QuestionCard } from '../../components'
import { CardGroup, Row, Col, Container } from 'react-bootstrap'
import quizData from '../../assets/testData/questions.json'
export const QuizPage = () => {
    const [players, setPlayers] = useState([{ 'id': 0, 'name': 'Idris', 'points': 0 }, { 'id': 1, 'name': 'Paul', 'points': 0 }, { 'id': 2, 'name': 'Henry', 'points': 0 }, { 'id': 3, 'name': 'Marco', 'points': 0 }])
    const [questionsLeft, setQuestionsLeft] = useState([])
    const [questionToAnswer, setQuestionToAnswer] = useState()
    
    const questionIdGen = (quizData) => {
        for (let i = 0; i< quizData['results'].length; i++) {
            quizData['results'][i]['id'] = i
        }
        return quizData['results']
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

    // {id: id, question: question, answers: [a1,a2,a3,a4]}
    const quizQuestions = (quizData) => {
        let questionsList = [];
        for (const questionData of quizData) {
            questionsList.push({'id': questionData['id'],'question':questionData['question'], "answers": answerRandomiser(questionData)})
        }
        setQuestionsLeft(questionsList)
    }

    const answerCheck = (questionId, playerAnswer, quizData) => {
        const correctAnswer = quizData.find((item) => item['id'] === questionId)['correct_answer']
        if (playerAnswer === correctAnswer) {
            console.log("1 point")
        } else {
            console.log("-1 point")
        }
    }

    const testfunc = () => {
        // console.log("before: ",quizData)
        const editedQuizData = questionIdGen(quizData)
        // console.log("after: ",editedQuizData)
        quizQuestions(editedQuizData)
        console.log(questionsLeft)
        // console.log(question)
        // setQuestion(question[0])
        // answerCheck(questions[0]['id'], questions[0]['answers'][0], editedQuizData)
    }


    return (
        <section id='Quiz Page' className='container'>
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
            <Col onLoad={testfunc}>
                <QuestionCard  question={questionsLeft}/>
            </Col>

            </Row>

        </section>
    )
}
