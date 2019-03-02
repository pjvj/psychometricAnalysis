import React from 'react';
import {browserHistory, Link} from "react-router";

const NavBar2 = (props) => {
    return (
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
                        <a href="/">Log Out</a>
                    </li>
                    <li>
                        <a href="#">Welcome {props.person.username}</a>
                    </li>
                </ul>
            </nav>
            </div>
        </section>
    );
};
export default NavBar2;