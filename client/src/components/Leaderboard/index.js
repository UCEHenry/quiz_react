import React from 'react'
import Button from 'react-bootstrap/Button'
import './style.css'
import { Table } from 'react-bootstrap'

export const Leaderboard = ({topTen}) => {
    return (

        <div >
            <hr></hr>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topTen.map(player=> (
                            <tr>
                                <td>{topTen.indexOf(player)+1}</td>
                                <td>{player.username}</td>
                                <td>{player.score}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

