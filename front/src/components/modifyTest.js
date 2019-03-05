import React,{Component} from 'react';
const axios = require("axios");
//import Gallery from 'react-grid-gallery';
import {Image} from 'react-bootstrap';
export default class ModifyTest extends Component{
    constructor(props) {
        super(props);
        this.state={
            test: "",
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
                test:nextProps.initialData[0]
            })

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
                this.setState({
                    quesans:response.data.response
                });
                //alert("The findtest is successful");
            }).catch((error) => {
        });

        axios.get(`http://localhost:8889/findimages/${user}/${testname}`)
            .then((response) => {
                console.log(response);
                console.log("state image",this.state.images);
                
                
                
                let images = [];
            response.data.response.map((value,key)=>{
                let url =`http://localhost:8889/getimage/${user}/${this.state.test}/${value}`; 
                fetch(url).then((res)=>res.blob()).catch((error)=>{
                    console.log(error);

                }).then((res)=>{console.log(res,"here is the response");
            images.push(res);
            if(key==response.data.response.length-1)
            {
                this.setState({
                    images:images,
                    showTest:true,
            showImages:true,
            user:user
        
                });
            }
            });
            });
            return images;
            }).then((res)=>{
                console.log(res,"cjjenc");
                
            }).catch((error) => {
        });
        

        
        

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
         var   testname= this.state.test;
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
         console.log(this.state.images);
        // console.log(this.props.initialData);
        return(
        <div>
            <div>
            {
                (this.props.initialData&&this.props.initialData.length>0)?(
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
                <div>
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
                                    console.log(value,key);
                                    let url =`http://localhost:8889/getimage/${this.state.user}/${this.state.test}/${value}`; 
                                    console.log(url);
                                    return (
                                        <tr  key ={key}>
                                            <td><Image style={{
                                                width:"50px",
                                                height:"50px"
                                            }}src={URL.createObjectURL(value)} name={"img"+key} roundedCircle /></td>
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