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
        console.log(testname);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            
        };
        var user= JSON.parse(localStorage.getItem("user")).username;
        axios.get(`http://localhost:8889/findtest/${user}/${testname}`)
            .then((response) => {
                console.log(response);
                var data= response.data;
                this.setState({
                    quesans:data
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
                //var data= response.imageLists;
                //alert("The findimages is successful");
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
                <Test/>
            </div>
        </div>
        )
    }
}