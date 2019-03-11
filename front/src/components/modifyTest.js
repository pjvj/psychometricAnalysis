import React,{Component} from 'react';
const axios = require("axios");
//import Gallery from 'react-grid-gallery';
import {Image} from 'react-bootstrap';
export default class ModifyTest extends Component{
    constructor(props) {
        super(props);
        this.state={
            test: "",
            imageup:[],
            imageNames:[],
            imageindex:[],
            images: [],
            delete:[],
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
        //user=this.props.person;
        var user= JSON.parse(localStorage.getItem("user")).username;
        axios.get(`http://localhost:8889/findtest/${user}/${testname}`)
            .then((response) => {
                console.log(response.data.response);
                this.setState({
                    quesans:response.data.response
                });
                //alert("The findtest is successful");
            }).catch((error) => {
        });

        

        axios.get(`http://localhost:8889/findimages/${user}/${testname}`)
            .then((response) => {
                console.log(response.data.response);
                let imageNames=response.data.response;
                this.setState({imageNames:imageNames});
                let images = [];
                response.data.response.map((value,key)=>{
                    //console.log("image ka naam", value);
                    let url =`http://localhost:8889/getimage/${user}/${this.state.test}/${value}`; 
                    fetch(url).then((res)=>res.blob()).catch((error)=>{
                        console.log(error);

                    }).then((res)=>{
                    images.push(res);
                    console.log("here is the response",res);
                    //if(key==response.data.response.length-1)
                    this.setState({
                        images:images,
                        showTest:true,
                        showImages:true,
                        user:user
        
                    });
                    //console.log("state inside image",this.state.images);
            });
            //console.log("state image",this.state.images);
            });
            return images;
            //console.log("state image",this.state.images);
            }).then((res)=>{
                
                //console.log(res,"cjjenc");
                

            }).catch((error) => {
        });
    
    }



    handleChange=(e)=>{
        //console.log(e.target.name);
        let image = this.state.images;
        let imageNames = this.state.imageNames;
        let phase  = this.state.quesans;
        let delimg = this.state.delete;
        let name = e.target.name;
        //console.log(name);
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
        else if(name.split('deleteImage').length>1)
        {
            //let imgind=this.state.imageindex;
            //console.log("image udne se pehle ",image);
            let index = parseInt(name.split('deleteImage')[1]);
            //this.refs.img+{index}
            delimg.push(this.state.imageNames[index]);
            //delimg.push(document.getElementById("img"+index).name)
            image.splice(index,1);
            imageNames.splice(index,1);
            //console.log("image udne k baad ",image);
            
        }
        else if(name.split('delete').length>1)
        {
            let index = parseInt(name.split('delete')[1]);
            phase.splice(index,1);
            
            
        }
        
        this.setState({
            quesans:phase,
            images: image,
            delete:delimg,
            imageNames:imageNames
        });
        
    }

    uploadFile = (e)=>{
        let images = this.state.images; 
        let imageup=this.state.imageup;
        let imageName= this.state.imageNames;
        const files = Array.from(e.target.files);
        for (var i=0;i<files.length;i++)
        {
            name= files[i].name;
            imageName.push(name);
        }

        images.push(...files);
        imageup.push(...files);
        console.log("upload file k ander",images);
        console.log("upload file k ander",imageName);
        this.setState({
            images:images,
            imageNames:imageName,
            imageup:imageup
        });
        
    }
    uploadQuesAns=(e)=>{
        let data={ 
            data:this.state.quesans,
            description:""
        };
        
        //console.log(data);
        //console.log(this.state.quesans);
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
                //alert("The test is successfully uploaded");
            }).catch((error) => {
        });

        
        
        data  = new FormData();
        var files= this.state.imageup;
        console.log("images going to be uploadded",files)
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
                alert("The files are successfully uploaded");
            }).catch((error) => {
        });

        data=this.state.delete;

        // var width = 1920; 
        // var height = 1080; 
        // var canvas = document.createElement('canvas');  // Dynamically Create a Canvas Element
        // canvas.id = "extractFileCanvas";  // Give the canvas an id
        // canvas.width  = width;  // Set the width of the Canvas
        // canvas.height = height;  // Set the height of the Canvas
        // canvas.style.display   = "none"; 
        // var imageBuffer = request.file.buffer;
        // var imageName = 'public/images/map.png';
        // fs.createWriteStream(imageName).write(imageBuffer);

        console.log("gfxhg",data);
        fetch(`http://localhost:8889/modifyimages/${user}/${testname}`,
            {
                method: 'post',
                headers: new Headers({'content-type': 'application/json'}),
                "withCredentials":true,
                "mode":"cors",
                body: JSON.stringify(data)
            }).then(response => {
                console.log("yoyoyoyoyoyoyoyoy");
                    
                });
    }
    render() {
    
        // if(!this.state.images.length)
        //     return null;
        // console.log(this.state.showTest);
        // console.log(this.state.quesans);
         //console.log(this.state.images);
        // console.log(this.props.initialData);
        return(
        <div>
            <div>
            {
                (this.props.initialData&&this.props.initialData.length>0)?(
                    <select className="selecttest" onChange={(e)=>{this.setState({
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
            <button className="addbutton" name="Submittestname" onClick={this.findTests}>Find test</button>
            </div>
            <div className="div ">
                {
                    (this.state.showTest)?(
                <div className="test1" style={{    backgroundColor: "lightblue"}}>
                <button className="addbutton" name="add" onClick={this.handleChange}>Add Row</button>
                <table className="tableques">
                    <tbody>
                    {this.state.quesans.map((value,key)=>{
                        //console.log(key)
                    return (
                    <tr  key ={key}>
                        <td><input  className="quesans" name={"question"+key} placeholder="Question" value={value.question} onChange={this.handleChange} /></td>
                        <td><input  className="quesans" name={"answer"+key} placeholder="Answer" value ={value.answer} onChange={this.handleChange}/></td>
                        <td><button className="deletebutton" name={"delete"+key} onClick={this.handleChange}>Delete</button></td>
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
                            <div className="test2" style={{ backgroundColor: "moccasin"}}>
                                <table>
                                <tbody>
                                {this.state.images.map((value,key)=>{
                                    console.log("i m going bananas ",value,key);
                                    //let url =`http://localhost:8889/getimage/${this.state.user}/${this.state.test}/${value}`; 
                                    //console.log(url);
                                    return (
                                        <tr  key ={key}>
                                            <td><img style={{
                                                width:"50px",
                                                height:"50px"
                                            }}src={URL.createObjectURL(value)} name={value} id={"img"+key} roundedCircle /></td>
                                            <td><button className="deletebutton" name={"deleteImage"+key} onClick={this.handleChange}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            </table>
                            <input className="addbutton" type="file" name="imgUploader"  onChange={this.uploadFile} multiple/>
                            </div>
                        ):  (<div> 
                                
                            </div> 
                            )
                    }
                </div>
                <div className="submitdiv">
                <button  className="addbutton" name="Submittest" onClick={this.uploadQuesAns}>SubmitChanges</button>
                </div>
        </div>
        )
    }
}