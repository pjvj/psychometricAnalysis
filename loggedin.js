import React, {Component} from 'react';
import NavBar from './navbar'
import PersonDetails from './person_details';
//import Footer from './footer';
//import {browserHistory} from "react-router";
import CreateTest from './createTest'
export default class LogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            create:false
        };
        
    }
    createTest=()=>{
        this.setState({
            create:true
        })
    }


    render() {
        return (
            <div>
                    <div>
                        <NavBar person={JSON.parse(localStorage.getItem("user"))}/>
                    </div>
                    <br/>
                    <br/>
                <div className="col-md-12">
                <div className="col-md-6">
                    <div className="row">
                        <button onClick={this.createTest}>Create Test</button>
                        {this.state.create&&(
                           <CreateTest/>
                          // <div>hvhgvvvh</div>
                        )}
                        <button>Get Your Test</button>
                        <button>Show Response</button>
                    </div>

                </div>
              { /* <div className="col-md-6">
                <div className="">
                    
                </div>

                
                        </div>*/}
                </div>
                <br/>

            </div>
        );
    }
}