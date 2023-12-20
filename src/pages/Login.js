import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import logo from '../images/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, [])

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:8000/user/"+username).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter Valid Username.')
                } else {
                    if (resp.password === password) {
                        sessionStorage.setItem('username', username);
                        usenavigate('/');
                    } else {
                        toast.error('Please Enter Valid Credentials')
                    }
                }
            }).catch((err)=> {
                console.log(err.message);
                toast.error('Login Failed due to :' + err.message)
            });
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    return (
            <div className="container container-reglog d-flex justify-content-center login">
                <form onSubmit={ProceedLogin}>
                    <div>
                        <h1>Login</h1>
                        <img src={logo} alt="logo" className="logoimg" />
                        <div>
                            <div className="form-group ">
                                <label>Username</label>
                                <input value={username} onChange={e=>updateUsername(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" value={password} onChange={e=>updatePassword(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="">Login</button>
                            <NavLink to="/register" className="regular-btn">Register</NavLink>
                        </div>
                    </div>
                </form>
            </div>
    );
}

export default Login;