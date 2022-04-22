import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap'

export const NavBar = () => {
    return (
        <Navbar bg='dark' variant="dark" expand='lg' sticky="top">
            <Container>
                <Navbar.Brand href="#"></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/settings'>Play</Nav.Link>
                        <Nav.Link href="/#">Leaderboard</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
