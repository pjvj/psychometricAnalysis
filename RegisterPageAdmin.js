import React from 'react';
import {browserHistory} from "react-router";

export default class RegisterPageUser extends React.Component
{
    onSubmit1()
    {
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
                    admin:true
                })
            }).then(response => {
            return response.json()
        }).then((data) => {
            console.log(data);
            browserHistory.push("/");
        })
            .catch(function (error) {
                alert(error);
            });
    }


    render() {
        return (
            <div className="div">
                
                    <h2 className="registerhd">REGISTER</h2>
                    <div className="input-container">
                        <i className="fa fa-user icon"/>
                        <input className="input-field" type="text" placeholder="Full Name" id="name"/>
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
                    <button type="submit" onClick={this.onSubmit1} className="btn">Register</button>
id
            </div>
        );
    }
}