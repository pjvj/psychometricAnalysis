import React,{Component} from 'react';
const axios = require("axios");



export default class ModifyTest extends Component{
    constructor(props) {
        super(props);
        this.state={
            test: "",
            images:[],
            quesans:[]
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
    handleChange=(e)=>{
        console.log(e.target.name);
        let test  = this.state.test;
        let name = e.target.name;
        if(name.split('testtomodify').length>1)
        {
            test=e.target.value;
            
        }
        this.setState({
            test:test
        });
    }   
    render() {
    
        // if(!this.state.images.length)
        //     return null;
        //console.log(this.state.images.length);
        let images = this.state.images.map((el, i) => (
            <img key={i} className='images' src={el} />
        ));
        return(
        <div>
            <input name="testtomodify" placeholder="testname" onChange={this.handleChange} ></input>
            <button name="Submittestname" onClick={this.findTests}>Find test</button>
            <div>
            {images}
            </div>
        </div>
        )
    }
}