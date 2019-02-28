import React from 'react';
import {browserHistory} from "react-router";


export default class SignPageUser extends React.Component {

    onSubmit1=()=> {
        console.log("gaya");
        fetch("http://localhost:8889/adminusersvalid/",
            {
                method: 'post',
                headers: new Headers({'content-type': 'application/json'}),
                "withCredentials":true,
                "mode":"cors",
                body: JSON.stringify({
                    username: document.getElementById("urn").value,
                    password: document.getElementById("psw").value,
                    admin:false

                })
            }).then(response => {
            return response.json()
        }).then(function (data) {
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data));
            browserHistory.push("logIn");

        })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="div">
             
                    <h2 className="registerhd">SIGNIN</h2>
                    <div className="input-container">
                        <i className="fa fa-user icon"/>
                        <input className="input-field" type="text" placeholder="Username" id="urn"/>
                    </div>
                    <div className="input-container">
                        <i className="fa fa-key icon"/>
                        <input className="input-field" type="password" placeholder="Password" id="psw"/>
                    </div>
                    <button type="submit" onClick={this.onSubmit1} className="btn">Sign In</button>
             
            </div>
        );
    }
}