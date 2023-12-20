import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useEffect } from "react";
import logo from '../images/logo.png'
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/posts.css';

const Header = () => {
    
    const usenavigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            usenavigate('/login');
        }
    }, []);

    return (
        <div>
            <div className="header">
                <div className='container-fluid'>
                    <div className='row align-items-center'>
                        <div className='col-lg-8'>
                            <div className='logo'>
                                <NavLink to={'/'} className="logo-link">
                                    <img src={logo} alt="logo" className="logoimg" />
                                </NavLink>
                            </div>
                        </div>
                        <div className='col-lg-1 align-items-end'>
                            <h2>{sessionStorage.getItem('username')}</h2>
                        </div>

                        <div className='col-lg-3'>
                            <div className='main_nav ml-auto'>
                                <nav id='primary_navigation' className='site_navigation'>
                                    <div className='main_menu'>
                                        <ul className='nav main_menu_list justify-content-end'>
                                            <li className='menu-item'>
                                                <NavLink to={'/login'} className='regular-btn'>Logout</NavLink>
                                                <NavLink to={'/create-post'} className='regular-btn'>Create a post</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;