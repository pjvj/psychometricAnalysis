import React, {Component} from 'react';
import NavBar from './navbar'
import PersonDetails from './person_details';
//import Footer from './footer';
//import {browserHistory} from "react-router";
import {Tabs,Tab,Row,Col,Nav,Sonnet} from 'react-bootstrap'
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
      
                <div >
                <div >
                    <div>
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
  <Tab eventKey={1} title="Create Test">
  <button onClick={this.createTest}>Create Test</button>
  {this.state.create&&(
                           <CreateTest/>
                          // <div>hvhgvvvh</div>
                        )}
  </Tab>
  <Tab eventKey={2} title="Get Your Test">
    
  </Tab>
  <Tab eventKey={3} title="Show Response" disabled>
    
  </Tab>
</Tabs>
      
                        
                        
                 
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