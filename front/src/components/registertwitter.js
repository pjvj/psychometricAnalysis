import React from 'react';
import {browserHistory} from "react-router";

export default class RegisterTwitter extends React.Component
{
    onSubmit1()
    {
        fetch("http://localhost:8000/userslist/",
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    username: document.getElementById("username").value,
                    password: document.getElementById("password").value,

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
            <div>
                <div className={"style"}>
                    <div>
                        <h1 className="center">REGISTER HERE</h1>
                    </div>
                    <div className="col-md-12 styling">
                        <label className="col-md-6 color1">Username: </label>
                        <input type="text" id="username" className="thick"/>
                    </div>
                    <div className="col-md-12 styling">
                        <label className="col-md-6 color1">Password: </label>
                        <input type="password" id="password" className="thick"/>
                    </div>
                    <div className="col-md-12 styling">
                        <label className="col-md-6 color1">Confirm Password: </label>
                        <input type="password" id="confirm" className="thick"/>
                    </div>
                    <div>
                        <button className="submit" onClick={this.onSubmit1}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}
