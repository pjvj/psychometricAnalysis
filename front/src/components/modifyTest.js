import React,{Component} from 'react';
const axios = require("axios");
//import Gallery from 'react-grid-gallery';
import {Image} from 'react-bootstrap';
const Dpath = `/Users/pallavi/college/psychometricAnalysis/UsersData/`;
export default class ModifyTest extends Component{
    constructor(props) {
        super(props);
        this.state={
            test: {},
            testdescription:"",
            images: [],
            quesans:[],
            showTest:false,
            showImages:false
        }
    }
    componentWillReceiveProps(nextProps,prevProps)
    {
        console.log("idhar",prevProps.initialData,nextProps.initialData)
        if(prevProps!=nextProps&&nextProps.initialData.length>0)
        {
            this.setState({
                test:nextProps.initialData
            })

        }
    }

    findTests=()=>{
        var testn=this.state.test;
        testn = Object.keys(testn);
        var testname= testn[0];
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
                this.setState({
                    quesans:response.data.response
                });
                //alert("The findtest is successful");
            }).catch((error) => {
        });

        axios.get(`http://localhost:8889/findimages/${user}/${testname}`)
            .then((response) => {
                console.log(response);
                this.setState({
                    images:response.data.response
                });
                console.log("state image",this.state.images);
                //var data= response.imageLists;
                //alert("The findimages is successful");
            }).catch((error) => {
        });
        this.setState({
            showTest:true,
            showImages:true
        })

    }
    handleChange=(e)=>{
        console.log(e.target.name);
        let image = this.state.images;
        let phase  = this.state.quesans;
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
        else if(name.split('deleteImages').length>1)
        {
            
            let index = parseInt(name.split('deleteImages')[1]);
            image=image.splice(index,1);
            console.log(image);
            
        }
        this.setState({
            quesans:phase,
            images: image
        });
        
    }

    uploadFile = (e)=>{
        const files = Array.from(e.target.files);
        this.setState({
            images:files
        });
       
    }
    uploadQuesAns=(e)=>{
        let data={ 
            data:this.state.quesans,
            description:document.getElementById("testd").value
        };
        
        console.log(data);
        console.log(this.state.quesans);
        var config = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        var user= JSON.parse(localStorage.getItem("user")).username;
        var testn=this.state.test;
        testn = Object.keys(testn);
        var testname= testn[0];
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
    render() {
    
        // if(!this.state.images.length)
        //     return null;
        // console.log(this.state.showTest);
        // console.log(this.state.quesans);
        // console.log(this.state.images);
        // console.log(this.props.initialData);
        return(
        <div>
            <div>
            {
                (this.props.initialData&&this.props.initialData.length>0 && console.log("cfhgvjhbkjnlkf efbWKE EF   BJLRJW"))?(
                    
                    <select onChange={(e)=>{this.setState({
                        test:e.target.value
                    })}}>
                        {this.props.initialData.map((value,key)=>{
                            return (<option key={key}>{value}</option>)
                        })}
                    </select>
                ):(<select>
                    <option>No test Found</option>
                </select>)
            }
            <button name="Submittestname" onClick={this.findTests}>Find test</button>
            </div>
            <div className="div ">
                {
                (this.state.showTest)?(
                <div> <input id = "testd" className="testinput" value={this.props.initialData[this.state.test]["testDescription"]} placeholder="Test Description"></input>
                <button name="add" onClick={this.handleChange}>Add Row</button>
                <table>
                    <tbody>
                    {this.state.quesans.map((value,key)=>{
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
                    ):(<p> Select your test above to be modified </p>)
                }
            </div>
                <div>
                    {
                        (this.state.showImages)?(
                            <div>
                                <table>
                                <tbody>
                                {this.state.images.map((value,key)=>{
                                    return (
                                        <tr  key ={key}>
                                            <td><Image src={`${Dpath}${JSON.parse(localStorage.getItem("user")).username}/${this.state.test}/Images2/`+value} name={"img"+key} roundedCircle /></td>
                                            <td><button className="images" name={"deleteImage"+key} onClick={this.handleChange}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            </table>
                            <input type="file" name="imgUploader"  onChange={this.uploadFile} multiple/>
                            </div>
                        ):  (<div> 
                                <p>No images. Add images</p> 
                                <input type="file" name="imgUploader"  onChange={this.uploadFile} multiple/>
                            </div> 
                            )
                    }
                </div>
                <button name="Submittest" onClick={this.uploadQuesAns}>SubmitChanges</button>
        </div>
        )
    }
}