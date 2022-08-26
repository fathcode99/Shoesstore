import React from "react";
import { useSelector, useDispatch } from "react-redux"
import {
    Col,
    Container, Row,
} from 'react-bootstrap'

import './component.css'
import { Link } from 'react-router-dom'

export default function NavLogin() {
    const state = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    const onLogOut = () => {
        localStorage.removeItem('idUser')
        dispatch({
            type: "LOGOUT"
        })
    }

    return (
        
        <div className="nav-top-main-container p-0">
            <Container >
                <Row>
                    <Col className="col-lg-2 col-sm-4"><i className="fa-solid fa-phone px-2"></i> +123 456 789 00</Col>
                    {state.username ?
                        <>
                            
                            <Col className="col-lg-2 offset-lg-6 col-sm-4 offset-sm-1">
                                <Link as={Link} to="/login" className="nav-top-text">
                                    <i className="fa-solid fa-user px-2" ></i>Hello, {state.username}
                                </Link>
                            </Col>
                            <Col className="col-lg-2 col-sm-3">
                                <Link as={Link} to="/" className="nav-top-text" onClick={onLogOut}>
                                    <i className="fa-solid fa-arrow-right-from-bracket px-2"></i>Logout
                                </Link>
                            </Col>

                        </>
                        :
                        <>
                            
                            <Col className="col-lg-2 offset-lg-6 col-sm-2 offset-sm-3">
                                <Link as={Link} to="/login" className="nav-top-text">
                                    <i className="fa-solid fa-user px-2" ></i>Login
                                </Link>
                            </Col>
                            <Col className="col-lg-2 col-sm-3">
                                <Link as={Link} to="/register" className="nav-top-text">
                                    <i className="fa-solid fa-user-group px-2"></i>Register
                                </Link>
                            </Col>
                        </>
                    }
                </Row>
            </Container>
        </div>
    )
}