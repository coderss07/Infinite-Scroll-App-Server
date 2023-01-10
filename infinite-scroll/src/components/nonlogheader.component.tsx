import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/main.css"

function LogNavBar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink to={"/"} className="nav-logo" onClick={handleClick}>
                        Infinite-Scroll
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink to={"/home"} className="nav-links" onClick={handleClick}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-links" onClick={handleClick}>
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-links" onClick={handleClick}>
                                Sign Up
                            </NavLink>
                        </li>
                    </ul>
                   
                    <label className="ham">
                        <input type="checkbox" id="check" onClick={handleClick}/> 
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    
                </div>
            </nav>
        </>

    );
}

export default LogNavBar;