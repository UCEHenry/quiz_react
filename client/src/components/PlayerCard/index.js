import React from 'react'
import { Button, Card, Row } from 'react-bootstrap/'
import { useSelector, useDispatch } from 'react-redux';
import { togglePlayerReady } from "../../actions";

export const PlayerCard = ({ player }) => {

    const dispatch = useDispatch()
    const handleToggle = (id) => 
    {
        
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
        <Card id={`playerCardId_${player.id}`} style={{ width: '18rem' }} className="text-start">

            <Card.Title>{player.name}</Card.Title> 
            {/* TODO  Change  conditional to be when all are ready */}
            {false? <Card.Body>{player.points}</Card.Body> : <Button className={readyButtonColour()} onClick={()=>handleToggle(player.id)}>Readyup</Button>}
        </Card>
    )
}
