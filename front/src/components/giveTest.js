import React,{Component} from 'react';
const axios = require("axios");
import Test from "./test.js";


export default class ModifyTest extends Component{
    constructor(props) {
        super(props);
        this.state={
            test: "",
            admin:"",
            images:[],
            quesans:[]
        }
    }

    
    handleChange=(e)=>{
        console.log(e.target.name);
        let test  = this.state.test;
        let admin = this.state.admin;
        let name = e.target.name;
        if(name.split('testtomodify').length>1)
        {
            test=e.target.value;
            this.setState({
                test:test
            });
        }
        else
        if(name.split('testadmin').length>1)
        {
            admin=e.target.value;
            this.setState({
                admin:admin
            });
        }
    }  
    
    findTests=()=>{
        var testname=this.state.test;
        var user= this.state.admin;
        console.log(user);
        console.log(testname);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            
        };
        
       
        axios.get(`http://localhost:8889/findtest/${user}/${testname}`)
            .then((response) => {
                console.log(response);
                this.setState({
                    quesans:response.response
                });
                //alert("The findtest is successful");
            }).catch((error) => {
        });

        axios.get(`http://localhost:8889/findimages/${user}/${testname}`)
            .then((response) => {
                console.log(response);
                this.setState({
                    images:response.files
                });
                console.log("state image",this.state.images);
                
            }).catch((error) => {
        });

    }

    render() {

        return(
        <div>
            <input name="testtomodify" placeholder="testname" onChange={this.handleChange} ></input>
            <input name="testadmin" placeholder="testadmin" onChange={this.handleChange}></input>
            <button name="Submitt" onClick={this.findTests}>Go to test</button>
            <div>
                {this.state.quesans.length>0 && <Test quesans={this.state.quesans } images={this.state.images}/> }
            </div>
        </div>
        )
    }
}