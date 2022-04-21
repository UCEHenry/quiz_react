import React from 'react'
import { Button, Card, Row } from 'react-bootstrap/'
import { useSelector, useDispatch } from 'react-redux';
import { togglePlayerReady } from "../../actions";

export const PlayerCard = ({ player, partyReady }) => {

    const dispatch = useDispatch()
    const handleToggle = (id) => {
        dispatch(togglePlayerReady(id))
    }

    const readyButtonColour = () => {
        if (player.isReady) {
            return 'btn-success'
        } else{
            return 'btn-danger'
        }
    }

    return (
        <Card role={`PlayerCard_${player.name}`} id={`playerCardId_${player.id}`} style={{ width: '18rem' }} className="text-start">

            <Card.Title>{player.name}</Card.Title> 
            {partyReady? <Card.Body role={`playerScore_${player.name}`}>{player.points}</Card.Body> : <Button role={`playerReadyButton_${player.name}`} className={readyButtonColour()} onClick={()=>handleToggle(player.id)}>Readyup</Button>}
        </Card>
    )
}
