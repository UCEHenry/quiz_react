import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectAnswer } from "../../actions";
export const QuestionButton = ({answer, playerId}) => {
    const player = useSelector(state => state.players[playerId])
    const [buttonColor, setButtonColor] = useState(' btn-secondary')
    const dispatch = useDispatch()
    const handleButtonColor =  () => {
        console.log(answer , player.selectedAnswer)
        if (answer === player.selectedAnswer) {
            // setButtonColor('btn-success')
            console.log('win')
            return 'btn-success'
        } else {
            console.log('loose')
            // setButtonColor('btn-seconday')
            return 'btn-secondary'
        }
    }
    const handleAnswerSelection = (id, answer) => {
        dispatch(selectAnswer(id, answer))
    }

    return (
        <>
        <Button onClick={()=>handleAnswerSelection(playerId, answer)} className={`my-1 ${handleButtonColor()}`}>{answer}</Button>
        </>

    )
}
