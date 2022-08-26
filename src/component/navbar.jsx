import React from "react";
import {useSelector} from "react-redux"
import {
    Col,
    Container, Nav, Row
} from 'react-bootstrap'

import './component.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const state = useSelector((state) => state.userReducer)
    return (
        <div className="navbar-main-container p-0">
            <Container className="navbar-style p-0">
                <Row >
                    <Col className="col-lg-4 col-sm-5 nav-brand-style">BRANDNAME</Col>
                    <Col className="col-lg-8 col-sm-7 nav-menu-style">
                        <Nav className="nav-text-menu" as={Link} to="/">HOME</Nav>
                        {state.role === "admin" ? 
                        <Nav className="nav-text-menu" as={Link} to="/historyadmin">HISTORY ADMIN</Nav>
                        :
                        <Nav className="nav-text-menu" as={Link} to="/history">HISTORY</Nav>
                        }
                        <Nav className="nav-text-menu" as={Link} to="/">ABOUT US</Nav>
                        <Nav className="nav-text-menu" as={Link} to="/">CONTACT US</Nav>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}