import React, {Component} from 'react';
import NavBar2 from './navbar2'
//import PersonDetails from './person_details';
//import Footer from './footer';
//import {browserHistory,Redirect} from "react-router";
//import {Tabs,Tab,Row,Col,Nav,Sonnet} from 'react-bootstrap'
import CreateTest from './createTest'
import ModifyTest from './modifyTest'
import SeeResponses from './response'
export default class LogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            create: false,
            modify: false,
            response: false,
            tests:[]
        };
        
    }

    doSomething=(evt, type)=>{
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(type).style.display = "block";
        evt.currentTarget.className += " active";
    }
    CreateTest=()=>{
        
        this.setState({
            create:true
        });
        this.doSomething(event,'Create');
        }
    ModifyTest=()=>{
        fetch("http://localhost:8889/getTests/",
            {
                method: 'post',
                headers: new Headers({'content-type': 'application/json'}),
                "withCredentials":true,
                "mode":"cors",
                body: JSON.stringify({
                    username:JSON.parse(localStorage.getItem("user")).username
                })
            }).then(response => {
            return response.json()
        }).then((res)=>{
            console.log(res);
            this.setState({
                tests:res
            });
        })
      
            this.setState({
                modify:true
            });
            this.doSomething(event,'Modify');
        }
    Response=()=>{
       
            this.setState({
                response:true
            });
            this.doSomething(event,'Response');
        }
    
       


    render() {
        return (
            <div>
                    <div>
                        <NavBar2 person={JSON.parse(localStorage.getItem("user"))}/>
                    </div>
                    <br/>
                    <br/>
                    <div className="tab">
                    <button className="tablinks" eventKey={1} onClick={this.CreateTest} >Create Test</button>
                                              
                    <button className="tablinks" eventKey={2} onClick={this.ModifyTest}> Your Tests</button>
                    
                    <button className="tablinks" eventKey={3} onClick={this.Response}> See Responses</button>
                    </div>
                    <div id="Create" className="tabcontent" >
                     {this.state.create&&(<CreateTest/> )}
                    </div>  
                    <div id="Modify" className="tabcontent" >
                    {this.state.modify&&( <ModifyTest initialData ={this.state.tests} person={JSON.parse(localStorage.getItem("user"))}/>)}
                    </div>  
                    <div id="Response" className="tabcontent">
                    {this.state.response&&(<SeeResponses/>)}
                    </div>  
                                         
            </div>
                    
            
        );
    }
}