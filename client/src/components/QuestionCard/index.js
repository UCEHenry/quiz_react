import React from "react";
import { Button, Card, ListGroup,  } from "react-bootstrap";

export const QuestionCard = ({question}) => {
    console.log(question)
    
    return (
        <Card>
            <Card.Header>{question.question}</Card.Header>
            <Card.Body>
                <ListGroup>
                <Button className="btn-secondary my-1">{question.answer}</Button>

                </ListGroup>
            </Card.Body>
        </Card>
    )
}
