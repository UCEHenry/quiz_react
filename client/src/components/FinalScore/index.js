import React from 'react'
import './style.css'
import { Table } from 'react-bootstrap'

export const FinalScore = ({players}) => {
    return (

        <div >
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
                        players.map(player=> (
                            <tr>
                                <td>{players.indexOf(player)+1}</td>
                                <td>{player.name}</td>
                                <td>{player.points}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

