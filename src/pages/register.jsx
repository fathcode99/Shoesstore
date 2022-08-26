import React, { useState } from "react";
import Axios from "axios";
import {
    Nav,
    Modal
} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux/es/exports";

const url = 'https://shoes-db.herokuapp.com'

export default function RegisterPage() {
    const state = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    // visible password
    const [pwVisible, setPwVisible] = useState(false)
    const onPwVisible = () => {
        setPwVisible(!pwVisible)
    }

    const [errorUsername, setErrorUsername] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorConfirmPw, setErrorConfirmPw] = useState(false)
    const [signUp, setSignUp] = useState(false)
    const handleClose = () => setSignUp(false);

    //error or valid username dan email
    const [existUser, setExistUser] = useState(false)
    const [existEmail, setExistEmail] = useState(false)

    const onSign = () => {
        console.log(errorUsername, errorEmail, errorPassword, errorConfirmPw)
        if (errorUsername || errorEmail || errorPassword || errorConfirmPw || existUser || existEmail)
            return setSignUp(true)

        let username = document.getElementById("reg-username").value
        let email = document.getElementById("reg-email").value
        let password = document.getElementById("reg-password").value
        let confirmPw = document.getElementById("reg-confirmPw").value
        let role = 'user'
        let cart = []

        if (!username || !email || !password || !confirmPw)
            return setSignUp(true)

        Axios.post(`${url}/user`, { username, email, password, role, cart })
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: 'SUCCESS_REG'
                })
            })
    }

    const userValid = (e) => {
        // console.log(e.target.value)
        let symb = /[~`!@#$%^&*()-+=]/
        if (symb.test(e.target.value) || e.target.value.length < 6)
            return setErrorUsername(true)
        setErrorUsername(false)

        let username = document.getElementById("reg-username").value
        Axios.get(`${url}/user?username=${username}`)
            .then(res => {
                if (res.data.length !== 0) {
                    setExistUser(true)
                } else {
                    setExistUser(false)
                }
            })
    }

    const emailValid = (e) => {
        let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regexEmail.test(e.target.value))
            return setErrorEmail(true)
        setErrorEmail(false)

        let email = document.getElementById("reg-email").value
        Axios.get(`${url}/user?email=${email}`)
            .then(res => {
                if (res.data.length !== 0) {
                    setExistEmail(true)
                } else {
                    setExistEmail(false)
                }
            })
    }

    const passValid = (e) => {
        let symb = /[~`!@#$%^&*()-+=]/
        let number = /[0-9]/
        if (!symb.test(e.target.value) || !number.test(e.target.value) || e.target.value.length < 8)
            return setErrorPassword(true)
        setErrorPassword(false)
    }

    const confirmPw = (e) => {
        let password = document.getElementById('reg-password').value;
        let confirmPw = document.getElementById('reg-confirmPw').value
        if (password !== confirmPw)
            return setErrorConfirmPw(true)
        setErrorConfirmPw(false)
    }

    if (state.successReg) {
        return (<Navigate to="/login" />)
    }

    return (
        <div className="login-bg">
            <div className="img-login-front">
                <Modal show={signUp} onHide={handleClose}>
                    <Modal.Body className="modal-body"><i className="fa-solid fa-triangle-exclamation px-2"></i>Please make sure all data is filled in and valid !</Modal.Body>
                </Modal>

                <div className="login-from-container">
                    <div className="login-text-title">Create Account</div>
                    <div>
                        <div className="login-box-from">
                            <label>Username </label>
                            <input className="login-input px-0" type="email" placeholder="Create Username" id="reg-username" onChange={(e) => userValid(e)} />
                            {errorUsername ? <b className="p-error">
                                Username min 6 character and without symbol</b>
                                :
                                existUser ? <b className="p-error">Username already exist</b> : ''
                            }

                        </div>

                        <div className="login-box-from">
                            <label>Email </label>
                            <input className="login-input px-0" type="email" placeholder="Input your email" id="reg-email" onChange={(e) => emailValid(e)} />
                            {errorEmail ? <b className="p-error">Please input your valid email</b>
                                :
                                existEmail ? <b className="p-error">Email already exist</b> : ''
                            }
                        </div>

                        <div className="login-box-from">
                            <label >Password </label>
                            <div className="login-box-form-pw">
                                <input className="login-input px-0" style={{width:"90%"}} type={pwVisible ? "text" :  "password"} placeholder="Password" id="reg-password" onChange={(e) => passValid(e)} />
                                <button className="login-input" style={{width:"10%"}} onClick={onPwVisible}>
                                    <i className="fa-solid fa-eye p-0"></i>
                                </button>
                            </div>
                            {errorPassword ? <b className="p-error">Please include alphabet, symbol, and numeric</b> : ''}
                        </div>

                        <div className="login-box-from">
                            <label >Confirm Password </label>
                            <input className="login-input px-0" type="password" placeholder="Confirm your password" id="reg-confirmPw" onChange={(e) => confirmPw(e)} />
                            {errorConfirmPw ? <b className="p-error">Your confirm password doesn't match</b> : ''}
                        </div>

                        <button className="btn-style mt-3" onClick={onSign} >Sign Up</button>
                        <p className="text-ask pt-3 m-0">
                            Have an account ?
                            <Nav as={Link} to="/login" className="btn-sign-up"> Login </Nav>
                        </p>
                        <p className="text-ask">
                            Go to
                            <Nav as={Link} to="/" className="btn-sign-up"> Home </Nav>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}