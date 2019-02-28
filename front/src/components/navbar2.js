import React from 'react';
import {browserHistory, Link} from "react-router";

const NavBar2 = (props) => {
    return (<nav className="navbar navbar-expand-lg navbar-light bg-light navbar-inverse ">
            <a className="navbar-brand " href="#"><span className="fill">CodeConnect</span></a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    </li>
                </ul>

                <button className="btn btn-outline-info my-2 my-sm-0"
                        onClick={()=>fetch("http://localhost:8000/usersvalid/",
                    {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            //username : sessionStorage.getItem('username')
                            username: document.getElementById("username").value,
                            password: document.getElementById("password").value

                        })
                    }).then(response => {
                    sessionStorage.clear();
                    return response.json()
                }).then(function (data) {
                    console.log(data);
                    localStorage.setItem("user", JSON.stringify(data));
                    browserHistory.push("logIn");

                })
                    .catch(function (error) {
                        console.log(error);
                    })

                } type="button"><Link to={"/"}><span
                    className="fill">Log Out</span></Link></button>
                <br/>
                <button className="btn btn-outline-info my-2 my-sm-0 " type="button"><span
                    className="fill">{props.person.name}</span></button>

            </div>
        </nav>
    );
};
export default NavBar2;