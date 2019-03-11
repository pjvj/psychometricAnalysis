import React,{Component} from 'react';
const axios = require("axios");
import Test from "./test.js";


export default class GiveTest extends Component{
    constructor(props) {
        super(props);
        this.state={
            test: "",
            admin:"",
            images:[],
            quesans:[],
            showtest: 0
        }
    }

    
    handleChange=(e)=>{
        //console.log(e.target.name);
        let test  = this.state.test;
        let admin = this.state.admin;
        let name = e.target.name;
        if(name.split('testtogive').length>1)
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
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            
        };
        axios.get(`http://localhost:8889/findtest/${user}/${testname}`)
            .then((response) => {
                console.log(response.data.response);
                this.setState({
                    quesans:response.data.response
                });
                if(this.state.quesans.length>0)
                {
                    this.setState({
                        showtest: 1
                    });
                }
                //alert("The findtest is successful");
            }).catch((error) => {
        });

        axios.get(`http://localhost:8889/findimages/${user}/${testname}`)
            .then((response) => {
                console.log(response.data.response);
                this.setState({
                    images:response.data.response
                });
                if(this.state.images.length>0)
                {
                    this.setState({
                        showtest: 1
                    });
                }
                //console.log("state image",this.state.images);
                
            }).catch((error) => {
        });

    }

    render() {
        
        return(
        <div>
            <div className="row startrow">
                <input className="testtogive" name="testtogive" placeholder="testname" onChange={this.handleChange} ></input>
                <input className="testtogive" name="testadmin" placeholder="testadmin" onChange={this.handleChange}></input>
            </div>
            <div className="row">
            <button className="addbutton" name="gototest" onClick={this.findTests}>Go to test</button>
            </div>
            <div>
                {
                    (this.state.showtest==1)?(<div> <Test quesans={this.state.quesans } user={this.state.admin} testname={this.state.test} images={this.state.images}/></div>):
                    (<div></div>) 
                }
            </div>
        </div>
        )
    }
}