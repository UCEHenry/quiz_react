import React from "react";
import { Button, Card, ListGroup,  } from "react-bootstrap";



export const QuestionCard = ({question}) => {
    console.log("questionData", question.id)
    
    return (
        <Card>
            <Card.Header>{question.question}</Card.Header>
            <Card.Body>
                <ListGroup>
                    {
                        question.answers.map(answer=> (
                            <Button key={Math.random()} className="btn-secondary my-1">{answer}</Button>
                        ))
                    }
                </ListGroup>
            </Card.Body>
        </Card>
    )
}
