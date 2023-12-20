import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logo from '../images/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    
    const [id, idChange] = useState("");
    const [password, passwordChange] = useState("");

    const navigate = useNavigate();

    const isValidate = () => {
        let isProceed = true;
        if (id === null || id === "") {
            isProceed = false;
            toast.warning('Please enter a Username.');
        }
        if (password === null || password === "") {
            isProceed = false;
            toast.warning('Please enter a Password.');
        }
        return isProceed;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let regobj = {id, password};
        
        if (isValidate()) {
            fetch("http://localhost:8000/user", {
            method: "POST",
            headers: {'content-type':'application/json'},
            body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }

    return (
            <div className="container container-reglog d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                <ToastContainer />
                    <div>
                        <h1>Register</h1>
                        <img src={logo} alt="logo" className="logoimg" />
                        <div>
                            <div className="form-group ">
                                <label>Username</label>
                                <input value={id} onChange={e=>idChange(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" value={password} onChange={e=>passwordChange(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="">Submit</button>
                            <NavLink className="regular-btn" to='/login'>Back</NavLink>
                        </div>
                    </div>
                </form>
            </div>
    );
}

export default Register;