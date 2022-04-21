import { border } from '@mui/system';
import React from 'react'
import { Button, Card, Row } from 'react-bootstrap/'
import { useSelector, useDispatch } from 'react-redux';
import { togglePlayerReady } from "../../actions";

export const PlayerCard = ({ player, partyReady, currentPlayerId }) => {

    const dispatch = useDispatch()
    const handleToggle = (id) => {
        dispatch(togglePlayerReady(id))
    }

    const readyButtonColour = () => {
        if (player.isReady) {
            return 'btn-success'
        } else {
            return 'btn-danger'
        }
    }

    const highlightPlayer = () => {

        if (player.id === currentPlayerId && partyReady) {
            return 'border border-5 border-warning w-75'
        } else {
            return 'w-50'
        }

    }

    return (
        <Card role={`PlayerCard_${player.name}`} id={`playerCardId_${player.id}`} style={{ width: '18rem' }} className={`text-start ${highlightPlayer()}`}>

            <Card.Title>{player.name}</Card.Title>
            {partyReady ? <Card.Body role={`playerScore_${player.name}`}>{player.points}</Card.Body> : <Button role={`playerReadyButton_${player.name}`} className={readyButtonColour()} onClick={() => handleToggle(player.id)}>Readyup</Button>}
        </Card>
    )
}
