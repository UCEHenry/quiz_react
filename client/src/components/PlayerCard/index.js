import React from 'react'
import { Card, Row } from 'react-bootstrap/'
export const PlayerCard = ({ player }) => {
    return (
        <Card style={{ width: '18rem' }} className="text-start">
            <Card.Title>{player.name}</Card.Title>
            <Card.Body>{player.points}</Card.Body>
        </Card>
    )
}
