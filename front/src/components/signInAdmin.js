import React from 'react';
import {browserHistory, Redirect} from "react-router";
import {Link} from "react-router";
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
                    admin:true

                })
            }).then(response => {
            return response.json()
        }).then(function (data) {
            console.log(data);
            if(data.error)
            {
                alert(data.msg);
            }
            else
            {
                localStorage.setItem("user", JSON.stringify(data.response));
                this.props.history.push('/logIn');
                //browserHistory.push("/logIn");
                //browserHistory.push("/");
                //this.props.history.push("/logIn");
                //<Redirect to="/logIn"/>
            }

        })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="main">
                
                    <h2 className="registerhd">SIGNIN</h2>
                    <form  onSubmit={this.onSubmit1}>
                        <div className="input-container">
                            <i className="fa fa-user icon"/>
                            <input className="input-field" type="text" placeholder="Username" id="urn"/>
                        </div>
                        <div className="input-container">
                            <i className="fa fa-key icon"/>
                            <input className="input-field" type="password" placeholder="Password" id="psw"/>
                        </div>
                        <div className="regform">
                        <button className="register">Sign In</button>
                        </div>
                    </form>
            </div>
        );
    }
}