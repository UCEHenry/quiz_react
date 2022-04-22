import React from 'react'
import Button from 'react-bootstrap/Button'
import './style.css'
import { Table } from 'react-bootstrap'

export const Leaderboard = () => {
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
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>10</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

