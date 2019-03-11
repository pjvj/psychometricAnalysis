import React from 'react';
import {Link} from "react-router";
//import {Navbar,Nav, Form, FormControl,Button} from "react-bootstrap";
import jQuery from 'jquery';




        const NavBar=()=>{
            return(
                <section className="navigation">
                    <div className="nav-container">
                        <div className="brand">
                            <a href="#!">Psychometric Analysis Tool</a>
                        </div>
                        <nav>
                            <div className="nav-mobile"><a id="nav-toggle" href="#!"><span/></a></div>
                            <ul className="nav-list">
                                <li>
                                    <a href="#!">Home</a>
                                </li>

                                <li>
                                    <a href="#one">Features</a>
                                </li>
                                <li>
                                    <a href="#!">Pricing</a>
                                </li>
                                <li>
                                    <a href="#">Register</a>
                                    <ul className="nav-dropdown">
                                        <li>
                                            <Link to={"registerUser"}>As User</Link>
                                        </li>
                                        <li>
                                            <Link to={"registerAdmin"}>As Admin</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">SignIn</a>
                                    <ul className="nav-dropdown">
                                        <li>
                                            <Link to={"signInUser"}>As User</Link>
                                        </li>
                                        <li>
                                            <Link to={"signInAdmin"}>As Admin</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#!">Contact</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </section>

            );
        };


export default NavBar;
