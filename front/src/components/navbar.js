import React from 'react';
import {Link} from "react-router";
//import {Navbar,Nav, Form, FormControl,Button} from "react-bootstrap";
import jQuery from 'jquery';

(function($) { // Begin jQuery
    $(function() { // DOM ready
        // If a link has a dropdown, add sub menu toggle.
        $('nav ul li a:not(:only-child)').click(function(e) {
            $(this).siblings('.nav-dropdown').toggle();
            // Close one dropdown when selecting another
            $('.nav-dropdown').not($(this).siblings()).hide();
            e.stopPropagation();
        });
        // Clicking away from dropdown will remove the dropdown class
        $('html').click(function() {
            $('.nav-dropdown').hide();
        });
        // Toggle open and close nav styles on click
        $('#nav-toggle').click(function() {
            $('nav ul').slideToggle();
        });
        // Hamburger to X toggle
        $('#nav-toggle').on('click', function() {
            this.classList.toggle('active');
        });
    }); // end DOM ready
})(jQuery); // end jQuery

/*
const NavBar = () =>{
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">Hidden brand</a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only"/></a>
                        </li>
                        <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">Register <span className="caret"/></a>
                            <ul className="dropdown-menu">
                                <li>
                                    <button className="btn btn-outline-success my-2 my-sm-0 " type="button"><Link to={"register"}><span className="fill ">Register As User</span></Link></button>
                                </li>
                                <li>
                                    <button className="btn btn-outline-success my-2 my-sm-0 " type="button"><Link to={"register"}><span className="fill ">Register As Admin</span></Link></button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                </nav>
                </div>
                );
                };

*/

        const NavBar=()=>{
            return(
                <section className="navigation">
                    <div className="nav-container">
                        <div className="brand">
                            <a href="#!">Psycho</a>
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
                                    <a href="#!">Register</a>
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
                                    <a href="#!">SignIn</a>
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

/*
        const NavBar = () =>{
            return(<nav className="navbar-nav navbar-dark bg-dark">
/*
                            "navbar navbar-expand-lg navbar-light bg-light navbar-inverse ">

                    <a className="navbar-brand " href="#"><span className="fill">PychoAnalysis</span></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">pallavi</span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                            </li>


                        <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">Register <span className="caret"/></a>
                            <ul className="dropdown-menu">
                                <li><button className="btn btn-outline-success my-2 my-sm-0 " type="button"><Link to={"register"}><span className="fill ">Register As User</span></Link></button>
                                </li><li>    <button className="btn btn-outline-success my-2 my-sm-0 " type="button"><Link to={"register"}><span className="fill ">Register As Admin</span></Link></button>
                                </li>

                            </ul>
                        </li>
                        <button className="btn btn-outline-success my-2 my-sm-0 " type="button"><Link to={"register"}><span className="fill ">Register</span></Link></button>

                        <button className="btn btn-outline-success my-2 my-sm-0 " type="button"><Link to={"signIn"}><span className="fill">SignIn</span></Link></button>
                        </ul>
                    </div>
                </nav>
            );
    };*/
export default NavBar;
