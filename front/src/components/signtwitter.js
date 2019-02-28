import React from 'react';
import {browserHistory} from "react-router";


export default class SignTwitter extends React.Component {

    onSubmit1() {
        console.log("gaya");
        fetch("http://localhost:8000/usersvalid/",
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: document.getElementById("username").value,
                    password: document.getElementById("password").value

                })
            }).then(response => {
            return response.json()
        }).then(function (data) {
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data));
            sessionStorage.setItem("username", JSON.stringify(username));
            browserHistory.push("logIn");

        })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div>
                <div className={"style"}>
                    <div>
                        <h1 className="center">SIGN IN</h1>
                    </div>
                    <div className="col-md-12 styling">
                        <label className="col-md-6 color1">Username: </label>
                        <input type="text" id="username" className="thick"/>
                    </div>
                    <div className="col-md-12 styling">
                        <label className="col-md-6 color1">Password: </label>
                        <input type="password" id="password" className="thick"
                               onKeyPress={(event)=>{
                                   if(event.key==="Enter")
                                       this.onSubmit1();
                               }}
                        />
                    </div>
                    <div>
                        <button type="button" className="submit" onClick={this.onSubmit1.bind(this)}>Sign In</button>
                    </div>
                </div>
            </div>
        );
    }
}
