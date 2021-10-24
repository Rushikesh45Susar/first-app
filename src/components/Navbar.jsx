import './body.css';
import React from 'react'
import logo from './images/NetFlixLogo.png'
import { Link } from 'react-router-dom';


function navbar(){
    return(
        <>
        <nav className="navbar">
            <img src={logo} alt="Logo" className="logo"/>
            <div className="join-box">
                <p className="join-msg">unlimitied tv shows & movies</p>
                <button className="btn join-btn">join now</button>
                <Link to="/signin">
                    <button className="btn">sign in</button>
                </Link>
            </div>
        </nav>
        </>
    )
}
export default navbar();
