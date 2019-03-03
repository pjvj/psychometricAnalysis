import React, {Component} from 'react';
import NavBar2 from './navbar2';
import GiveTest from './giveTest';
//import Results from './results';

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create: false,
            modify: false,
            response: false
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
    GiveTest=()=>{
        
        this.setState({
            create:true
        });
        this.doSomething(event,'Create');
        }
    
    Results=()=>{
       
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
                    <button className="tablinks" eventKey={1} onClick={this.GiveTest} >Give Test</button>                    
                    <button className="tablinks" eventKey={3} onClick={this.Response}> See Results</button>
                    <div id="Create" className="tabcontent" >
                     {this.state.create&&(<GiveTest/> )}
                    </div>    
                    <div id="Results" className="tabcontent">
                    {this.state.response&&(<Results/>)}
                    </div>  
                    </div>                     
            </div>
                    
            
        );
    }
}