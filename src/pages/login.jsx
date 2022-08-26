import React, { useState } from "react";
import Axios from "axios";
import {
    Modal,
    Nav
} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const url = 'https://shoes-db.herokuapp.com'

export default function LoginPages() {
    const state = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    
    const [pwVisible, setPwVisible] = useState(false)
    const onPwVisible = () => {
        setPwVisible(!pwVisible)
    }
    // Authentication
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    // const [errorLogin, setErrorLogin] = useState(false)
    const handleCloseLogin = () => {
        dispatch({
            type: "HANDLE_CLOSE"
        })
    }


    // const handleClose = () => setError(false);

    const onSign = async () => {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value

        if (!username && !password) {
            return (setErrorPassword(true), setErrorUsername(true))
        } else if (!username && password) {
            return (setErrorPassword(false), setErrorUsername(true))
        } else if (username && !password) {
            return (setErrorPassword(true), setErrorUsername(false))
        }

        await Axios.get(`${url}/user?username=${username}&password=${password}`)
            .then(res => {
                if (res.data.length === 0) {
                    dispatch({
                        type: "ERROR_LOGIN"
                    })
                } else {
                    localStorage.setItem('idUser', res.data[0].id)
                    dispatch({
                        type: "LOGIN",
                        payload: res.data[0]
                    })
                }
                console.log(res.data)
            })
    }

    if (state.username) {
        return (<Navigate to="/" />)
    }
    
    return (
        <div className="login-bg">
            <div className="img-login-front">

                <Modal show={state.errorLogin} onHide={handleCloseLogin}>
                    <Modal.Body className="modal-body"><i className="fa-solid fa-triangle-exclamation px-2"></i>This account is doesn't exist. Please Sign Up first !</Modal.Body>
                </Modal>

                <div className="login-from-container">
                    <div className="login-text-title">Hello, welcome back !</div>
                    <div>
                        <div className="login-box-from">
                            <label>Username </label>
                            <input className="login-input px-0" style={{width:"100%"}} type="text" placeholder="Username" id="username" />
                            {errorUsername ? <b className="p-error"> Please input your Username !</b> : ''}
                        </div>

                        <div className="login-box-from">
                            <label >Password </label>
                            <div className="login-box-form-pw">
                                <input className="login-input px-0" style={{width:"90%"}} type={pwVisible ? "text" :  "password"} placeholder="Password" id="password" />
                                <button className="login-input" style={{width:"10%"}} onClick={onPwVisible}>
                                    <i className="fa-solid fa-eye p-0"></i>
                                </button>
                            </div>
                            {errorPassword ? <b className="p-error"> Please input your Password !</b> : ''}
                        </div>

                        <button className="btn-style mt-3" onClick={onSign}>Login</button>

                        <p className="text-ask pt-3 m-0">
                            Don't have an account yet ?
                            <Nav as={Link} to="/register" className="btn-sign-up"> Sign Up </Nav>
                        </p>
                        <p className="text-ask ">
                            Go to
                            <Nav as={Link} to="/" className="btn-sign-up"> Home </Nav>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}