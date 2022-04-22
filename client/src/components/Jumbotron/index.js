import React from 'react'
import Button from 'react-bootstrap/Button'
import './style.css'
import { useNavigate } from "react-router";
export const Jumbotron = () => {
    const navigate = useNavigate()
    return (

        <div className='jumbotron '>
            <div className='container text-light text-center'>
                <h1 className='display-3 pt-5'>Quiz Wars</h1>
                <hr></hr>
                <Button onClick={()=>{navigate('/settings')}} variant="success" className='mx-5 btn-lg'>Host</Button>
                <Button className='mx-5 btn-lg'>Join</Button>
            </div>
        </div>
    )
}
