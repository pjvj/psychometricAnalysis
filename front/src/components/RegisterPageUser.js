import React from 'react';
import {history} from "react-router";
import {Link} from "react-router";
//import { Route } from 'react-router-dom'
//import $ from 'jquery';
//import {bootstrapValidator} from 'react-bootstrap';

export default class RegisterPageUser extends React.Component
{
    onSubmit1=()=>
    {
        console.log("jbjjcsbdbdsb");
        fetch("http://localhost:8889/registernewuser",
            {
                method: 'post',
                headers: new Headers({'content-type': 'application/json'}),
                "withCredentials":true,
                "mode":"cors",
                body:JSON.stringify({
                    fullname: document.getElementById("name").value,
                    username: document.getElementById("urn").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("psw").value,
                    admin:false
                })
            }).then(response => {
               
            return response.json();
        }).then((data) => {
            console.log(data);
            alert(data.msg);
            this.props.history.push('/signInUser');
           
        })
            .catch(function (error) {
                alert(error);
            });
    }




    render() {
        return (
    <div className="main">
            <h2 className="registerhd">REGISTER</h2>
            <form className="regform" onSubmit={this.onSubmit1}>
            <div className="input-container">
                <i className="fa fa-user icon"/>
                <input minLength={10} className="input-field" type="text" placeholder="Full Name" id="name"/>
            </div>
            <div className="input-container">
                <i className="fa fa-user icon"/>
                <input className="input-field" type="text" placeholder="Username" id="urn"/>
            </div>
            <div className="input-container">
                <i className="fa fa-envelope icon"/>
                <input className="input-field" type="text" placeholder="Email" id="email"/>
            </div>
            <div className="input-container">
                <i className="fa fa-key icon"/>
                <input className="input-field" type="password" placeholder="Password" id="psw"/>
            </div>
            <div className="input-container">
                <i className="fa fa-key icon"/>
                <input className="input-field" type="text" placeholder="Confirm Password" id="psw chk"/>
            </div>
            <div className="input-container" >
                <button type="submit" className="register">Register</button>
            </div>            
            </form>
    </div>
        );
    }
}