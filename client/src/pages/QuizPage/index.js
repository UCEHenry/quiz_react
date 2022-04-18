import React, { useState } from 'react'
import { PlayerCard } from '../../components'
import { CardGroup, Row, Col } from 'react-bootstrap'
export const QuizPage = () => {
    const [players, setPlayers] = useState([{ 'id': 0, 'name': 'Idris', 'points': 0 }, { 'id': 1, 'name': 'Paul', 'points': 0 }, { 'id': 2, 'name': 'Henry', 'points': 0 }, { 'id': 3, 'name': 'Marco', 'points': 0 }])
    console.log(players)

    return (
        <section id='Quiz Page' className='container'>
            <h1>quiz page</h1>
            <Row xs={1} md={1}>
                {players.map(playerData => (
                    <Col  key={playerData.id}>
                        <PlayerCard player={playerData} />
                    </Col>
                ))}
            </Row>

        </section>
    )
}
