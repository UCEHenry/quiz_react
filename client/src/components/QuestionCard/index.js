import React from "react";
import { Button, Card, ListGroup, } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { selectAnswer } from "../../actions";
import { decode } from "html-entities"
import './style.css'

export const QuestionCard = ({ question, currentPlayerId }) => {
    console.log(question, currentPlayerId)
    const dispatch = useDispatch()
    const handleAnswerSelection = (id, answer) => {
        dispatch(selectAnswer(id, answer))
    }
    
    return (

        <Card>
            <Card.Header>Question {question.id + 1}: {decode(question.question)}</Card.Header>
            <Card.Body>
                <ListGroup>
                    {
                        question.answers.map(answer => (
                            <Button onClick={()=>handleAnswerSelection(currentPlayerId, answer)} key={Math.random()} className="selected btn-secondary my-1 ">{answer}</Button>
                        ))
                    }
                </ListGroup>
            </Card.Body>
        </Card>
    )
}
 //scoreUpdate + 1 if answer == correct answer
