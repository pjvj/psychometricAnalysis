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
