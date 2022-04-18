import React from 'react'
import heroImage from '../../assets/images/placeholder.jpg'
import Button from 'react-bootstrap/Button'
import './style.css'
export const Jumbotron = () => {
    
    return (

        <div style={{backgroundImage: `linear-gradient(to bottom, #212529, rgba(255,255,255,0)),url(${heroImage})`}} className='jumbotron '>
            <div className='container text-light text-center'>
                <h1 className='display-3 pt-5'>Quiz Wars</h1>
                <hr></hr>
                <Button className='mx-5 btn-lg'>Host</Button>
                <Button className='mx-5 btn-lg'>Join</Button>
            </div>
        </div>
    )
}
