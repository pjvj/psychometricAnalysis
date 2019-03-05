import React,{Component} from 'react';
const axios = require("axios");
import {Image} from 'react-bootstrap';

export default class CreateTest extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            phase1:[{question:"gyugyggugug ",answer:"hbhbhjjhbj"}],
            images:[]
        }
    }
    handleChange=(e)=>{
        console.log(e.target.name);
        
        let phase  = this.state.phase1;
        let name = e.target.name;
        if(name.split('question').length>1)
        {
            let index = parseInt(name.split('question')[1]);
            phase[index].question=e.target.value;
            
        }
        else if(name.split('answer').length>1)
        {
            let index = parseInt(name.split('answer')[1]);
            phase[index].answer=e.target.value;
            
        }
        else if(name.split("add").length>1)
        {
            phase.push({question:'',answer:''});
           
        }
        else if(name.split('delete').length>1)
        {
            let index = parseInt(name.split('delete')[1]);
            phase=phase.splice(index,1);
            
        }
        this.setState({
            phase1:phase
        });
        
    }
    uploadFile = (e)=>{
        const files = Array.from(e.target.files);
        console.log(files);
        let images = this.state.images;
        console.log(images);
        images.push(...files);
        console.log(images);
        this.setState({
            images:images
        });
       
    }
    uploadQuesAns=(e)=>{
        let data={ 
            data:this.state.phase1,
            description:document.getElementById("testd").value
        };
        
        console.log(data);
        console.log(this.state.phase1);
        var config = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        var user= JSON.parse(localStorage.getItem("user")).username;
         var   testname= document.getElementById("testname").value;
        axios.post(`http://localhost:8889/uploadtest/${user}/${testname}`,data,config)
            .then((response) => {
                alert("The test is successfully uploaded");
            }).catch((error) => {
        });

         data  = new FormData();
        var files= this.state.images;
        for(let k=0;k<files.length;k++)
        {
            data.append('imgUploader',files[k]);
        }
        config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
           
            
        };
        axios.post(`http://localhost:8889/upload/${user}/${testname}`,data,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });

    }
    render()
    {
        return(
        
        <div >
            
            <div className="testcred">
            <input className="testinput" id="testname" placeholder="Test Name"></input>
            <input id = "testd" className="testinput" placeholder="Test Description"></input>
            </div>
            <div className="test1" style={{    backgroundColor: "lightblue"}}>
                <p style={{fontFamily: "Consolas",fontSize:"30px"}}>
                You can add question and their expected answer for the first phase of test here.</p>
            <button name="add" onClick={this.handleChange}>Add Row</button>
            <table>
                <tbody>
                {this.state.phase1.map((value,key)=>{
                    return (
                    <tr  key ={key}>
                        <td><input  className="quesans" name={"question"+key} placeholder="Question" value={value.question} onChange={this.handleChange} /></td>
                        <td><input  className="quesans" name={"answer"+key} placeholder="Answer" value ={value.answer} onChange={this.handleChange}/></td>
                        <td><button className="quesans" name={"delete"+key} onClick={this.handleChange}>Delete</button></td>
                    </tr>)
                })}
                </tbody>
            </table>
            </div>
            <div className="test2" style={{    backgroundColor: "moccasin"}}>
            <p style={{fontFamily: "Consolas", fontSize:"30px"}}>
            You can add images for the second phase of test here.</p>
            <input type="file" name="imgUploader"  onChange={this.uploadFile} multiple/>
            </div>
            {this.state.images&&this.state.images.length>0
            &&this.state.images.map((value,key)=>{
                return (<Image key={key+1} style={{
                    width:"50px",
                    height:"50px"
                }}src={URL.createObjectURL(value)} name={"img"+key} roundedCircle />)
            })}
            <button name="Submittest" onClick={this.uploadQuesAns}>Submit test</button>
        </div>);
    }

}